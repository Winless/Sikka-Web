"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pools = exports.tokens = exports.ContractAddress = exports.userInfo = exports.chainIdDict = exports.EARN = exports.BONDING = exports.ORACLE = exports.ERC20 = void 0;
const erc20_1 = require("./raw/erc20");
const oracle_1 = require("./raw/oracle");
const bonding_1 = require("./raw/bonding");
const earn_1 = require("./raw/earn");
exports.ERC20 = erc20_1.erc20;
exports.ORACLE = oracle_1.oracle;
exports.BONDING = bonding_1.bonding;
exports.EARN = earn_1.earn;
exports.chainIdDict = {
    1: "Ethereum Mainnet",
    3: "Ropsten Test",
    4: "Rinkeby Test",
    5: "Goerli Test",
    42: "Kovan Test",
    56: "BSC Mainnet",
    97: "BSC Test",
    128: "HECO Mainnet",
    336: "MULTEST",
    1023: "CLOVER Mainnet",
    80001: "Polygon Test",
    43113: "AvalancheFUJI",
    43114: "Avalanche Mainnet"
};
exports.userInfo = {
    account: "",
    chainID: 80001,
    chain: "Mumbai",
};
exports.ContractAddress = {
    1: {
        earn: "0x03860F63208227448896655331B53591293672c7",
        amaticb: "0xc0E099a9AB1A4E8B68e36D69E10b814DeD724Cf3",
        sikka: "0xA97454425e4a0F1451731792918E5f9E4F1b4e8e",
        skusd: "0xcBF768965aaAF4821c33bd3596ac4016AC6A0cb3",
        oracle: "0x26026bcF97449B2A35907cf372bEF0e2d027C9Bf",
        bonding: "0x47FF7f18330845997AE891A4812Ba6b0e7cE0C5F",
        WETH: "",
        gql: "http://104.250.41.6:3022/",
        daily: "http://104.250.41.6:3022/comm/daily",
        dashboard: "http://104.250.41.6:3022/comm/dashboard",
        userAction: "http://104.250.41.6:3022/comm/userAction/" //0x8599F82A966444F087608CD8C057b1BF0f507EEC/0/10
    },
    80001: {
        earn: "0xBD57aD6aB8a22162B87235D1ac0670B97252f21b",
        amaticb: "0x18bB26984B8d9A73D436CE1Cf7358cC94Df302Ec",
        sikka: "0xe265F0ac296F5D3AEf1a5D95e44390f0322BE307",
        skusd: "0x6EFf3b7EdA60065aE5e05b346ca84BECEEe117eb",
        oracle: "0x468f66bDC34F9a78a33cFdc6E9a587a527Caca48",
        bonding: "0x8d243c6DB9CEb637FD3B0D61Ed6de9721a874507",
        WETH: "",
        gql: "http://104.250.41.6:3022/",
        daily: "http://104.250.41.6:3022/comm/daily",
        dashboard: "http://104.250.41.6:3022/comm/dashboard",
        userAction: "http://104.250.41.6:3022/comm/userAction/" //0x8599F82A966444F087608CD8C057b1BF0f507EEC/0/10
    },
};
/**
 * tokens
 */
exports.tokens = [
    { decimals: "18", id: "0x18bB26984B8d9A73D436CE1Cf7358cC94Df302Ec", symbol: "AMATICB" },
    { decimals: "18", id: "0xe265F0ac296F5D3AEf1a5D95e44390f0322BE307", symbol: "SIKKA" },
    { decimals: "18", id: "0x6EFf3b7EdA60065aE5e05b346ca84BECEEe117eb", symbol: "SKUSD" },
    { decimals: "18", id: "0x4342A69731BB4F32b1F526b4435aE8152F9d1a9d", symbol: "AUSP" },
];
/**
 * pools
 */
exports.pools = [{
        id: "0x0000000000000000000000000000000000000000",
        token0: { decimals: "6", id: "0x85eD8780eeC181b21E1057F840623F1e9E89924e", symbol: "USP" },
        token1: { decimals: "6", id: "0x71A4C56f9165f17cD4c940f37b88aBD9C19F0F6d", symbol: "AUSP" },
    }];
//# sourceMappingURL=lib_config.js.map