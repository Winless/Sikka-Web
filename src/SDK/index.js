"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountInfo = exports.getEarnInfo = exports.getPrices = exports.getBorrowInfo = exports.getBorrowInfo1 = exports.getTokensBalance1 = exports.getTokensBalance = exports.getAllowance = exports.getPoolList = exports.getGasTokenBanlance = exports.init = exports.changeMetamaskChain = exports.isETHAddress = exports.getPool = exports.getTokenSymbol = exports.getTokenAddress = exports.getBalance = exports.toPrecision = exports.importToken = exports.connect = exports.sign = exports.logout = exports.sleep = exports.trace = exports.toThousands = exports.setTraceShow = exports.div = exports.mul = exports.sub = exports.add = exports.withdrawEarn = exports.deposit = exports.repayCall = exports.borrow = exports.repay = exports.swap = exports.withdraw = exports.provide = exports.approveToken = void 0;
const httpSearch_1 = require("./httpSearch");
var execute_1 = require("./execute");
Object.defineProperty(exports, "approveToken", { enumerable: true, get: function () { return execute_1.approveToken; } });
Object.defineProperty(exports, "provide", { enumerable: true, get: function () { return execute_1.provide; } });
Object.defineProperty(exports, "withdraw", { enumerable: true, get: function () { return execute_1.withdraw; } });
Object.defineProperty(exports, "swap", { enumerable: true, get: function () { return execute_1.swap; } });
Object.defineProperty(exports, "repay", { enumerable: true, get: function () { return execute_1.repay; } });
Object.defineProperty(exports, "borrow", { enumerable: true, get: function () { return execute_1.borrow; } });
Object.defineProperty(exports, "repayCall", { enumerable: true, get: function () { return execute_1.repayCall; } });
Object.defineProperty(exports, "deposit", { enumerable: true, get: function () { return execute_1.deposit; } });
Object.defineProperty(exports, "withdrawEarn", { enumerable: true, get: function () { return execute_1.withdrawEarn; } });
const lib_config_1 = require("./lib_config");
const lib_utils_1 = require("./lib.utils");
var lib_utils_2 = require("./lib.utils");
Object.defineProperty(exports, "add", { enumerable: true, get: function () { return lib_utils_2.add; } });
Object.defineProperty(exports, "sub", { enumerable: true, get: function () { return lib_utils_2.sub; } });
Object.defineProperty(exports, "mul", { enumerable: true, get: function () { return lib_utils_2.mul; } });
Object.defineProperty(exports, "div", { enumerable: true, get: function () { return lib_utils_2.div; } });
Object.defineProperty(exports, "setTraceShow", { enumerable: true, get: function () { return lib_utils_2.setTraceShow; } });
Object.defineProperty(exports, "toThousands", { enumerable: true, get: function () { return lib_utils_2.toThousands; } });
Object.defineProperty(exports, "trace", { enumerable: true, get: function () { return lib_utils_2.trace; } });
Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return lib_utils_2.sleep; } });
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return lib_utils_2.logout; } });
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return lib_utils_2.sign; } });
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return lib_utils_2.connect; } });
Object.defineProperty(exports, "importToken", { enumerable: true, get: function () { return lib_utils_2.importToken; } });
Object.defineProperty(exports, "toPrecision", { enumerable: true, get: function () { return lib_utils_2.toPrecision; } });
Object.defineProperty(exports, "getBalance", { enumerable: true, get: function () { return lib_utils_2.getBalance; } });
Object.defineProperty(exports, "getTokenAddress", { enumerable: true, get: function () { return lib_utils_2.getTokenAddress; } });
Object.defineProperty(exports, "getTokenSymbol", { enumerable: true, get: function () { return lib_utils_2.getTokenSymbol; } });
Object.defineProperty(exports, "getPool", { enumerable: true, get: function () { return lib_utils_2.getPool; } });
Object.defineProperty(exports, "isETHAddress", { enumerable: true, get: function () { return lib_utils_2.isETHAddress; } });
Object.defineProperty(exports, "changeMetamaskChain", { enumerable: true, get: function () { return lib_utils_2.changeMetamaskChain; } });
/**
 * 初始化
 */
async function init() {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.EARN, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].earn);
    let ausp = await contract.methods.ausp().call();
    var token = lib_config_1.tokens.find(item => item.symbol === "AUSP");
    token.id = ausp;
    (0, httpSearch_1.loginCall)();
}
exports.init = init;
/**
 * gas币得数量
 * @returns
 */
async function getGasTokenBanlance() {
    let balance = await lib_utils_1.web3.eth.getBalance(lib_config_1.userInfo.account);
    return (0, lib_utils_1.convertBigNumberToNormal)(balance, 18);
}
exports.getGasTokenBanlance = getGasTokenBanlance;
/**
 * 获取池子地址
 * @returns
 */
function getPoolList() {
    return lib_config_1.tokens;
}
exports.getPoolList = getPoolList;
/**
 * 获取授权值
 * @param token_address
 * @param type
 * @returns
 */
async function getAllowance(token_address, type = "borrow") {
    let destina_address = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding;
    if (type === "earn") {
        destina_address = lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].earn;
    }
    return await (0, lib_utils_1._getAllowance)(token_address, destina_address);
}
exports.getAllowance = getAllowance;
/**
 * 所有币的余额
 * @param tokenList
 * @returns
 */
async function getTokensBalance(tokenList) {
    const inputs = [];
    let WETH = "";
    for (let i = 0; i < tokenList.length - 1; i++) {
        if ((0, lib_utils_1.getTokenSymbol)(tokenList[i]) === "ETH" || (0, lib_utils_1.getTokenSymbol)(tokenList[i]) === "WETH") {
            let temp = tokenList[i];
            tokenList[i] = tokenList[tokenList.length - 1];
            tokenList[tokenList.length - 1] = temp;
        }
    }
    for (let i = 0; i < tokenList.length; i++) {
        if (tokenList[i] == lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].WETH) {
            WETH = await lib_utils_1.web3.eth.getBalance(lib_config_1.userInfo.account);
        }
        else {
            inputs.push({ target: tokenList[i], function: 'balanceOf', args: [lib_config_1.userInfo.account] });
        }
    }
    //@ts-ignore
    const mcRes = await lib_utils_1.multi.multiCall(lib_config_1.ERC20, inputs);
    let balances = [];
    for (let i = 0; i < tokenList.length; i++) {
        let balance = "";
        if (tokenList[i] == lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].WETH) {
            balance = (0, lib_utils_1.convertBigNumberToNormal)(WETH, (0, lib_utils_1.getDecimal)(tokenList[i]));
        }
        else {
            balance = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][i].toString(), (0, lib_utils_1.getDecimal)(tokenList[i]));
        }
        balances.push({
            id: tokenList[i],
            symbol: (0, lib_utils_1.getTokenSymbol)(tokenList[i]),
            balance: balance
        });
    }
    return balances;
}
exports.getTokensBalance = getTokensBalance;
async function getTokensBalance1() {
    let AMATICB = (0, lib_utils_1.getTokenAddress)("AMATICB");
    let SIKKA = (0, lib_utils_1.getTokenAddress)("SIKKA");
    let SKUSD = (0, lib_utils_1.getTokenAddress)("SKUSD");
    let AUSP = (0, lib_utils_1.getTokenAddress)("AUSP");
    let contract1 = new lib_utils_1.web3.eth.Contract(lib_config_1.ERC20, AMATICB);
    let contract2 = new lib_utils_1.web3.eth.Contract(lib_config_1.ERC20, SIKKA);
    let contract3 = new lib_utils_1.web3.eth.Contract(lib_config_1.ERC20, SKUSD);
    let contract4 = new lib_utils_1.web3.eth.Contract(lib_config_1.ERC20, AUSP);
    let res1 = await contract1.methods.balanceOf(lib_config_1.userInfo.account).call({ from: lib_config_1.userInfo.account });
    let res2 = await contract2.methods.balanceOf(lib_config_1.userInfo.account).call({ from: lib_config_1.userInfo.account });
    let res3 = await contract3.methods.balanceOf(lib_config_1.userInfo.account).call({ from: lib_config_1.userInfo.account });
    let res4 = await contract4.methods.balanceOf(lib_config_1.userInfo.account).call({ from: lib_config_1.userInfo.account });
    return [
        {
            symbol: "AMATICB",
            id: AMATICB,
            balance: (0, lib_utils_1.convertBigNumberToNormal)(res1)
        },
        {
            symbol: "SIKKA",
            id: SIKKA,
            balance: (0, lib_utils_1.convertBigNumberToNormal)(res2)
        },
        {
            symbol: "SKUSD",
            id: SKUSD,
            balance: (0, lib_utils_1.convertBigNumberToNormal)(res3)
        },
        {
            symbol: "AUSP",
            id: AUSP,
            balance: (0, lib_utils_1.convertBigNumberToNormal)(res4)
        },
    ];
}
exports.getTokensBalance1 = getTokensBalance1;
async function getBorrowInfo1() {
    let prices = await getPrices();
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.BONDING, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding);
    let totalLoan = await contract.methods.totalLoan().call();
    let totalBorrow = await contract.methods.totalBorrow().call();
    let borrowRate = await contract.methods.borrowRate().call();
    let payBackRate = await contract.methods.payBackRate().call();
    let loanRate = await contract.methods.loanRate().call();
    let liquidateRate = await contract.methods.liquidateRate().call();
    let interestRate = await contract.methods.interestRate().call();
    let self = await contract.methods.users(lib_config_1.userInfo.account).call();
    let calculateInterest = await contract.methods.calculateInterest(lib_config_1.userInfo.account).call();
    let SKUSDPrice = prices.find(it => it.symbol === "SKUSD").price;
    let amountLoan = (0, lib_utils_1.convertBigNumberToNormal)(self.amountLoan, 18);
    let amountBorrow = (0, lib_utils_1.convertBigNumberToNormal)(self.amountBorrow, 18);
    let liquidationPrice = ((+amountBorrow * +SKUSDPrice) * (1 + +(0, lib_utils_1.convertBigNumberToNormal)(liquidateRate, 18))) / +amountLoan;
    return {
        total: {
            totalLoan: (0, lib_utils_1.convertBigNumberToNormal)(totalLoan, 18),
            totalBorrow: (0, lib_utils_1.convertBigNumberToNormal)(totalBorrow, 18),
            loanRate: (0, lib_utils_1.convertBigNumberToNormal)(loanRate, 18),
            borrowRate: (0, lib_utils_1.convertBigNumberToNormal)(borrowRate, 18),
            payBackRate: (0, lib_utils_1.convertBigNumberToNormal)(payBackRate, 18),
            liquidateRate: (0, lib_utils_1.convertBigNumberToNormal)(liquidateRate, 18),
            interestRate: +(0, lib_utils_1.convertBigNumberToNormal)(interestRate, 18) * 8640 * 365, //年化
        },
        self: {
            calculateInterest: (0, lib_utils_1.convertBigNumberToNormal)(calculateInterest, 18),
            amountLoan,
            amountBorrow,
            liquidationPrice: +amountBorrow > 0 ? liquidationPrice : 0, //清算价格
        },
        prices: prices
    };
}
exports.getBorrowInfo1 = getBorrowInfo1;
async function getBorrowInfo() {
    let prices = await getPrices();
    const inputs = [];
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'totalLoan', args: [] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'totalBorrow', args: [] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'borrowRate', args: [] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'loanRate', args: [] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'liquidateRate', args: [] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'interestRate', args: [] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'calculateInterest', args: [lib_config_1.userInfo.account] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'users', args: [lib_config_1.userInfo.account] });
    inputs.push({ target: lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].bonding, function: 'payBackRate', args: [] });
    //@ts-ignore
    const mcRes = await lib_utils_1.multi.multiCall(lib_config_1.BONDING, inputs);
    let totalLoan = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][0].toString());
    let totalBorrow = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][1].toString());
    let borrowRate = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][2].toString());
    let loanRate = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][3].toString());
    let liquidateRate = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][4].toString());
    let interestRate = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][5].toString());
    let calculateInterest = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][6].toString());
    let self = mcRes[1][7];
    let payBackRate = (0, lib_utils_1.convertBigNumberToNormal)(mcRes[1][8].toString());
    let SKUSDPrice = prices.find(it => it.symbol === "SKUSD").price;
    let amountLoan = (0, lib_utils_1.convertBigNumberToNormal)(self.amountLoan.toString());
    let amountBorrow = (0, lib_utils_1.convertBigNumberToNormal)(self.amountBorrow.toString());
    let liquidationPrice = ((+amountBorrow * +SKUSDPrice) * (1 + +liquidateRate)) / +amountLoan;
    return {
        total: {
            totalLoan: totalLoan,
            totalBorrow: totalBorrow,
            loanRate: loanRate,
            borrowRate: borrowRate,
            payBackRate: payBackRate,
            liquidateRate: liquidateRate,
            interestRate: +interestRate * 8640 * 365, //年化
        },
        self: {
            calculateInterest: calculateInterest,
            amountLoan,
            amountBorrow,
            liquidationPrice: +amountBorrow > 0 ? liquidationPrice : 0, //清算价格
        },
        prices: prices
    };
}
exports.getBorrowInfo = getBorrowInfo;
async function getPrices() {
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.ORACLE, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].oracle);
    let AMATICB = (0, lib_utils_1.getTokenAddress)("AMATICB");
    let SIKKA = (0, lib_utils_1.getTokenAddress)("SIKKA");
    let SKUSD = (0, lib_utils_1.getTokenAddress)("SKUSD");
    let AMATICBPrice = await contract.methods.getPrice("AMATICB").call();
    let SIKKAPrice = await contract.methods.getPrice("SIKKA").call();
    let SKUSDPrice = await contract.methods.getPrice("USP").call();
    return [{
            symbol: "AMATICB",
            id: AMATICB,
            price: (0, lib_utils_1.convertBigNumberToNormal)(AMATICBPrice, 18),
        },
        {
            symbol: "SIKKA",
            id: SIKKA,
            price: (0, lib_utils_1.convertBigNumberToNormal)(SIKKAPrice, 18),
        },
        {
            symbol: "SKUSD",
            id: SKUSD,
            price: (0, lib_utils_1.convertBigNumberToNormal)(SKUSDPrice, 18),
        }];
}
exports.getPrices = getPrices;
async function getEarnInfo() {
    let prices = await getPrices();
    let uspPrice = prices.find(it => it.symbol === "SKUSD").price;
    let contract = new lib_utils_1.web3.eth.Contract(lib_config_1.EARN, lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].earn);
    let _price = await contract.methods.currentPrice().call();
    let price = (0, lib_utils_1.convertBigNumberToNormal)(_price);
    let _reward = await contract.methods.rewardPerBlock().call();
    let ausp = await contract.methods.ausp().call();
    let contract1 = new lib_utils_1.web3.eth.Contract(lib_config_1.ERC20, ausp);
    let _balance = await contract1.methods.balanceOf(lib_config_1.userInfo.account).call({ from: lib_config_1.userInfo.account });
    let balance = (0, lib_utils_1.convertBigNumberToNormal)(_balance);
    let withdrowAmount = (+price * +balance) / +uspPrice;
    let reward = +(0, lib_utils_1.convertBigNumberToNormal)(_reward) * 8640 * withdrowAmount;
    return {
        interest: {
            day: reward,
            week: reward * 7,
            month: reward * 30,
            year: reward * 365
        },
        withdrowAmount: withdrowAmount, //相当于usp个数
    };
}
exports.getEarnInfo = getEarnInfo;
/**
 * account页面信息
 * @returns
 */
async function getAccountInfo() {
    let earn = await getEarnInfo();
    let borrow = await getBorrowInfo();
    let SKUSD = (0, lib_utils_1.getTokenAddress)("SKUSD");
    let balance = await getTokensBalance([SKUSD]);
    let amaticbPrice = borrow.prices.find(it => it.symbol === "AMATICB").price;
    let sikkaPrice = borrow.prices.find(it => it.symbol === "SIKKA").price;
    let uspPrice = borrow.prices.find(it => it.symbol === "SKUSD").price;
    return {
        deposit: earn.withdrowAmount,
        borrow: borrow.self.amountBorrow,
        USPAmount: balance[0].balance,
        sikkaPrice: +sikkaPrice / +uspPrice,
        earnapy: earn.interest.year,
        totalCollateral: borrow.self.amountLoan,
        totalCollateralUSP: +borrow.self.amountLoan * +amaticbPrice / +uspPrice,
        totalCollateralValue: +borrow.self.amountLoan * +amaticbPrice,
        netApy: borrow.total.interestRate * (1 - +borrow.total.payBackRate),
        borrowLimit: (+borrow.self.amountLoan * +amaticbPrice * +borrow.total.borrowRate) / +uspPrice,
        schedule: +borrow.self.amountBorrow / (+borrow.self.amountLoan * +amaticbPrice / +uspPrice), //进度条  单位：需要乘以100%
    };
}
exports.getAccountInfo = getAccountInfo;
//# sourceMappingURL=index.js.map