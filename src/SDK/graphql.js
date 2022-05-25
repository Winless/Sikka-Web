"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeInfo = exports.getDayNum = void 0;
const lib_utils_1 = require("./lib.utils");
const lib_config_1 = require("./lib_config");
function getDayNum(startTime) {
    let oneDay = 60 * 60 * 24;
    let endTime = Math.floor(Date.now() / 1000);
    let startDayNum = Math.floor(startTime / oneDay);
    let endDayNum = endTime % oneDay > 0 ? Math.floor(endTime / oneDay) + 1 : Math.floor(endTime / oneDay);
    return endDayNum - startDayNum;
}
exports.getDayNum = getDayNum;
/**
 * 获取exchange
 * @returns
 */
async function getExchangeInfo() {
    // let dayBlock = 86400;
    let dayBlock = 4 * 60 * 24;
    let block = await lib_utils_1.web3.eth.getBlockNumber();
    let yesterdayBlock = block - dayBlock;
    // let yesterdayBlock = block - dayBlock * 3;
    const query = `
  {
    now: exchangeEntities {
      token0SoldTokenAmount
      token1SoldTokenAmount
      token0BoughtTokenAmount
      token1BoughtTokenAmount
    }
    yesterday: exchangeEntities(block: {number: ${yesterdayBlock}}) {
      token0SoldTokenAmount
      token1SoldTokenAmount
      token0BoughtTokenAmount
      token1BoughtTokenAmount
    }
  }`;
    let data = await (0, lib_utils_1.post)(lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].gql, query);
    let now = data.data.now[0];
    let yesterday = data.data.yesterday[0];
    let token0SoldTokenAmountY = yesterday?.token0SoldTokenAmount ?? 0;
    let token0BoughtTokenAmountY = yesterday?.token0BoughtTokenAmount ?? 0;
    let token1SoldTokenAmountY = yesterday?.token1SoldTokenAmount ?? 0;
    let token1BoughtTokenAmountY = yesterday?.token1BoughtTokenAmount ?? 0;
    let token0Volume24h = +now.token0SoldTokenAmount + +now.token0BoughtTokenAmount - (+token0SoldTokenAmountY + +token0BoughtTokenAmountY);
    let token1Volume24h = +now.token1SoldTokenAmount + +now.token1BoughtTokenAmount - (+token1SoldTokenAmountY + +token1BoughtTokenAmountY);
    return { volume24h: token0Volume24h + token1Volume24h };
}
exports.getExchangeInfo = getExchangeInfo;
//# sourceMappingURL=graphql.js.map