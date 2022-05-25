"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawEarn = exports.deposit = exports.repayCall = exports.repay = exports.borrow = exports.swap = exports.withdraw = exports.provide = exports.approveToken = void 0;
const _1 = require(".");
const lib_config_1 = require("./lib_config");
const lib_utils_1 = require("./lib.utils");
/**
 * 对token授权
 * @param token_address
 * @param type
 * @param callback
 */
async function approveToken(token_address, type = "borrow", callback) {
    let destina_address = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding;
    if (type === "earn") {
        destina_address = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].earn;
    }
    (0, lib_utils_1._approveToken)(token_address, destina_address, callback);
}
exports.approveToken = approveToken;
/**
 * provide 存
 * @param amount
 * @param callback
 */
async function provide(amount, callback) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.BONDING, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding);
    let bigAmount = (0, lib_utils_1.convertNormalToBigNumber)(amount, 18);
    (0, lib_utils_1.executeContract)(contract, "provide", "0", [bigAmount], callback);
}
exports.provide = provide;
/**
 * withdraw 提出
 * @param amount
 * @param callback
 */
async function withdraw(amount, callback) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.BONDING, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding);
    let bigAmount = (0, lib_utils_1.convertNormalToBigNumber)(amount, 18);
    (0, lib_utils_1.executeContract)(contract, "withdraw", "0", [bigAmount], callback);
}
exports.withdraw = withdraw;
/**
 * swap
 * @param token0
 * @param token1
 * @param dx
 * @param dy
 * @param callback
 */
function swap(token0, token1, dx, dy, callback) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.ORACLE, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].amaticb);
    let decimal0 = (0, lib_utils_1.getDecimal)(token0);
    let decimal1 = (0, lib_utils_1.getDecimal)(token1);
    let bigAmount1 = (0, lib_utils_1.convertNormalToBigNumber)(dx, decimal0);
    let bigAmount2 = (0, lib_utils_1.convertNormalToBigNumber)(dy, decimal1);
    let symbol0 = (0, _1.getTokenSymbol)(token0);
    let symbol1 = (0, _1.getTokenSymbol)(token1);
    let _i = symbol0 === "USDC" ? 0 : 1;
    let _j = symbol1 === "USDT" ? 1 : 0;
    (0, lib_utils_1.executeContract)(contract, "exchange", "0", [_i, _j, bigAmount1, bigAmount2], callback);
}
exports.swap = swap;
/**
 * borrow
 * @param amount0
 * @param callback
 */
async function borrow(amount0, callback) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.BONDING, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding);
    let bigAmount0 = (0, lib_utils_1.convertNormalToBigNumber)(amount0, 18);
    (0, lib_utils_1.executeContract)(contract, "borrow", "0", [bigAmount0], callback);
}
exports.borrow = borrow;
/**
 * repay
 * @param amount
 * @param callback
 */
async function repay(amount, callback) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.BONDING, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding);
    let bigAmount = (0, lib_utils_1.convertNormalToBigNumber)(amount, 18);
    (0, lib_utils_1.executeContract)(contract, "repay", "0", [bigAmount], callback);
}
exports.repay = repay;
async function repayCall(amount) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.BONDING, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding);
    let bigAmount = (0, lib_utils_1.convertNormalToBigNumber)(amount, 18);
    let res = await contract.methods.repay(bigAmount).call({ from: lib_config_1.userInfo.account });
    console.log(res);
    // let amount = convertBigNumberToNormal(res, 18);
    // return {
    //   amount
    // }
}
exports.repayCall = repayCall;
async function deposit(amount, callback) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.EARN, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].earn);
    let bigAmount = (0, lib_utils_1.convertNormalToBigNumber)(amount, 18);
    (0, lib_utils_1.executeContract)(contract, "stake", "0", [bigAmount], callback);
}
exports.deposit = deposit;
async function withdrawEarn(amount, callback) {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.EARN, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].earn);
    let bigAmount = (0, lib_utils_1.convertNormalToBigNumber)(amount, 18);
    (0, lib_utils_1.executeContract)(contract, "withdraw", "0", [bigAmount], callback);
}
exports.withdrawEarn = withdrawEarn;
//# sourceMappingURL=execute.js.map