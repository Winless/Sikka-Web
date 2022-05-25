"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstPageInfo = exports.getDashboardInfo = exports.getDashboardChart = void 0;
const bignumber_js_1 = require("bignumber.js");
bignumber_js_1.BigNumber.config({ ROUNDING_MODE: 1 });
bignumber_js_1.BigNumber.config({ EXPONENTIAL_AT: 1e+9 });
const dailyUrl = "http://104.250.41.6:3022/comm/daily";
const dashboardUrl = "http://104.250.41.6:3022/comm/dashboard";
function convertBigNumberToNormal(number, decimals = 18, fix = 10) {
    let result = new bignumber_js_1.BigNumber(number).dividedBy(new bignumber_js_1.BigNumber(Math.pow(10, decimals)));
    return result.toFixed(fix);
}
let daily;
postSearch(dailyUrl).then(data => { daily = data?.data ?? []; });
/**
 * Dashboard界面图标
 */
async function getDashboardChart() {
    return daily.map(item => {
        let currentPrice = convertBigNumberToNormal(item.currentPrice);
        let totalSupply = convertBigNumberToNormal(item.totalSupply);
        let AMATICBPrice = convertBigNumberToNormal(item?.AMATICBPrice ?? "1000000000000000000");
        let USPPrice = convertBigNumberToNormal(item?.USPPrice ?? "1000000000000000000");
        return {
            ts: item.ts,
            totalLoan: +convertBigNumberToNormal(item.totalLoan) * (+AMATICBPrice / +USPPrice),
            totalBorrow: +convertBigNumberToNormal(item.totalBorrow) / +USPPrice,
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
    let res = await postSearch(dashboardUrl);
    if (res.code === 2000) {
        let obj = {};
        res.data.forEach((item) => {
            let key = Object.keys(item)[0];
            if (key === "userCount") {
                obj[key] = item[key];
            }
            else {
                obj[key] = convertBigNumberToNormal(item[key]);
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
//# sourceMappingURL=landingInfo.js.map