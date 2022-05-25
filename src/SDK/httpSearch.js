"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCall = exports.getFirstPageInfo = exports.getTransferAction = exports.getApr = exports.getDashboardInfo = exports.getDashboardChart = void 0;
const lib_utils_1 = require("./lib.utils");
const lib_config_1 = require("./lib_config");
const dayjs_1 = __importDefault(require("dayjs"));
(0, dayjs_1.default)().format();
let daily;
/**
 * Dashboard界面图标
 */
async function getDashboardChart() {
    if (!daily?.data) {
        daily = await postSearch(lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].daily);
    }
    return daily.data.map((item) => {
        let currentPrice = (0, lib_utils_1.convertBigNumberToNormal)(item.currentPrice);
        let totalSupply = (0, lib_utils_1.convertBigNumberToNormal)(item.totalSupply);
        let AMATICBPrice = (0, lib_utils_1.convertBigNumberToNormal)(item?.AMATICBPrice ?? "1000000000000000000");
        let USPPrice = (0, lib_utils_1.convertBigNumberToNormal)(item?.USPPrice ?? "1000000000000000000");
        return {
            ts: item.ts,
            totalLoan: +(0, lib_utils_1.convertBigNumberToNormal)(item.totalLoan) * (+AMATICBPrice / +USPPrice),
            totalBorrow: +(0, lib_utils_1.convertBigNumberToNormal)(item.totalBorrow) / +USPPrice,
            totalDeposit: (+totalSupply * +currentPrice) / +USPPrice,
            auspPrice: currentPrice
        };
    });
}
exports.getDashboardChart = getDashboardChart;
/**
 * 获取Dashboard的数据
 * @returns
 */
async function getDashboardInfo() {
    let url = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].dashboard;
    let res = await postSearch(url);
    if (res.code === 2000) {
        let obj = {};
        res.data.forEach((item) => {
            let key = Object.keys(item)[0];
            if (key === "userCount") {
                obj[key] = item[key];
            }
            else {
                obj[key] = (0, lib_utils_1.convertBigNumberToNormal)(item[key]);
            }
        });
        let totalDeposit = +obj.auspTotalSupply * +obj.earnPrice;
        return {
            interestRate: +obj.interestRate * 8640 * 365,
            payBackRate: obj.payBackRate,
            totalDeposit: totalDeposit,
            totalCollateral: +obj.totalLoan,
            totalCollateralValue: +obj.totalLoan * +obj.AMATICBPrice,
            yieldReserve: +obj.earnUspAmount - totalDeposit / +obj.USPPrice,
            SIKKAPrice: obj.SIKKAPrice,
            totalBorrow: obj.totalBorrow,
            totalBorrowValue: +obj.totalBorrow * +obj.USPPrice,
            depositAPY: +obj.rewardPerBlock * 8640 * 365,
            aMATICbPrice: +obj.AMATICBPrice,
            USPPrice: +obj.USPPrice,
            userCount: obj.userCount //用户人数
        };
    }
    return {
        interestRate: 0,
        payBackRate: 0,
        totalDeposit: 0,
        totalCollateralValue: 0,
        totalCollateral: 0,
        yieldReserve: 0,
        SIKKAPrice: 0,
        totalBorrow: 0,
        totalBorrowValue: 0,
        depositAPY: 0,
        aMATICbPrice: 0,
        USPPrice: 0,
        userCount: 0,
    };
}
exports.getDashboardInfo = getDashboardInfo;
/**
 * 获取apr数组  14天
 * @returns
 */
async function getApr() {
    if (!daily?.data) {
        daily = await postSearch(lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].daily);
    }
    return daily.data.slice(-14).map((item) => {
        let _value = +(0, lib_utils_1.convertBigNumberToNormal)(item.rewardPerBlock);
        let value = (_value * 8640 * 365 * 100).toFixed(2);
        return {
            ts: item.ts,
            value: +value,
        };
    });
}
exports.getApr = getApr;
/**
 * 交易记录
 * @returns
 */
async function getTransferAction() {
    let arry = [];
    for (let i = 0; i < 3; i++) {
        let url = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].userAction + lib_config_1.userInfo.account + `/${i}/20`;
        let res = await postSearch(url);
        arry = [...arry, ...res.data.data];
        if (res.data.total < (i + 1) * 20) {
            break;
        }
    }
    return arry.map((item) => {
        let obj = {
            action: "",
            amount: "",
            symbol: "",
            title: "",
            hash: "",
            ts: 0,
            block: "",
            time: "",
        };
        obj.action = item.action;
        obj.hash = item.hash;
        obj.ts = item.__mint_ts__;
        obj.block = item.__mint_block__;
        obj.time = (0, dayjs_1.default)(item.__mint_ts__ * 1000).format("ddd, MMM D, YYYY, h:mm:ss A");
        switch (item.action) {
            case "Provide": {
                obj.amount = (0, lib_utils_1.convertBigNumberToNormal)(item.amount);
                obj.symbol = "aMATICb";
                obj.title = "Borrow";
                break;
            }
            case "Borrow": {
                obj.amount = (0, lib_utils_1.convertBigNumberToNormal)(item.amountBorrow);
                obj.symbol = "USP";
                obj.title = "Borrow";
                break;
            }
            case "Repay": {
                obj.amount = (0, lib_utils_1.convertBigNumberToNormal)(item.amountRepay);
                obj.symbol = "USP";
                obj.title = "Borrow";
                break;
            }
            case "Stake": {
                obj.amount = (0, lib_utils_1.convertBigNumberToNormal)(item.amountInUSP);
                obj.symbol = "USP";
                obj.title = "Earn";
                break;
            }
            case "Withdraw": {
                let cont = item.contract.toLowerCase();
                let addr = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding.toLowerCase();
                obj.amount = cont === addr ? (0, lib_utils_1.convertBigNumberToNormal)(item.amount) : (0, lib_utils_1.convertBigNumberToNormal)(item.amountOutUSP);
                obj.symbol = cont === addr ? "aMATICb" : "USP";
                obj.title = cont === addr ? "Borrow" : "Earn";
                break;
            }
        }
        return obj;
    });
}
exports.getTransferAction = getTransferAction;
/**
 * 主页页面数据
 * @returns
 */
async function getFirstPageInfo() {
    let dashboard = await getDashboardInfo();
    let arry = await getDashboardChart();
    arry = arry.slice(-7);
    let volume0 = arry[0].totalLoan + arry[0].totalDeposit;
    let volume7 = arry[arry.length - 1].totalLoan + arry[arry.length - 1].totalDeposit;
    return {
        userCount: dashboard.userCount,
        tvl: dashboard.totalDeposit + dashboard.totalCollateralValue,
        volume7d: (volume7 - volume0) * dashboard.USPPrice,
        depositAPY: dashboard.depositAPY,
        USPPrice: dashboard.USPPrice,
    };
}
exports.getFirstPageInfo = getFirstPageInfo;
/***
 * 发送数据
 */
async function postSearch(url) {
    return fetch(url, { method: "get" }).then(response => response.json());
}
/**
 * 登录成功调一次
 */
async function loginCall() {
    let url = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].gql + "users/login";
    fetch(url, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ address: lib_config_1.userInfo.account })
    });
}
exports.loginCall = loginCall;
//# sourceMappingURL=httpSearch.js.map