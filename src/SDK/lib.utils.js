"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.executeContract = exports.transferFrom = exports.transfer = exports.sign = exports.changeMetamaskChain = exports.logout = exports.connect = exports.importToken = exports._getAllowance = exports._approveToken = exports.getDecimal = exports.getBalance = exports.isETHAddress = exports.getPoolDetail = exports.getPool = exports.getTokenSymbol = exports.getTokenAddress = exports.findToken = exports.sleep = exports.getDeadLine = exports.trace = exports.setTraceShow = exports.toThousands = exports.toPrecision = exports.div = exports.mul = exports.sub = exports.add = exports.minusBigNumber = exports.calculateMultiplied = exports.calculatePercentage = exports.convertNormalToBigNumber = exports.convertBigNumberToNormal = exports.multi = exports.web3 = void 0;
const ethers_1 = require("ethers");
const multicall_1 = require("@indexed-finance/multicall");
const web3_1 = __importDefault(require("web3"));
const bignumber_js_1 = require("bignumber.js");
const lib_config_1 = require("./lib_config");
const web3modal_1 = __importStar(require("web3modal"));
const web3_provider_1 = __importDefault(require("@walletconnect/web3-provider"));
bignumber_js_1.BigNumber.config({ ROUNDING_MODE: 1 });
bignumber_js_1.BigNumber.config({ EXPONENTIAL_AT: 1e+9 });
// const customNetworkOptions = {
//   rpcUrl: 'https://rpc-mainnet.maticvigil.com',
//   chainId: 137
// }
const providerOptions = {
    // dcentwallet: {
    //   package: DcentProvider, // required
    //   options: {
    //     rpcUrl: "INSERT_RPC_URL" // required
    //   }
    // },
    // fortmatic: {
    //   package: Fortmatic, // required
    //   options: {
    //     key: "FORTMATIC_KEY", // required,
    //     network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
    //   }
    // },
    // torus: {
    //   package: Torus, // required
    //   options: {
    //     networkParams: {
    //       host: "https://localhost:8545", // optional
    //       chainId: 1337, // optional
    //       networkId: 1337 // optional
    //     },
    //     config: {
    //       buildEnv: "development" // optional
    //     }
    //   }
    // },
    // portis: {
    //   package: Portis, // required
    //   options: {
    //     id: "PORTIS_ID" // required
    //   }
    // },
    // authereum: {
    //   package: Authereum // required
    // },
    // binancechainwallet: {
    //   package: true
    // },
    walletconnect: {
        package: web3_provider_1.default,
        options: {
            infuraId: "1e9c56c0a90243e0899ae4123eff056f",
        }
    },
    imtoken: {
        package: web3_provider_1.default,
        options: {
            infuraId: "1e9c56c0a90243e0899ae4123eff056f",
        }
    },
    mathwallet: {
        package: web3_provider_1.default,
        options: {
            infuraId: "1e9c56c0a90243e0899ae4123eff056f",
        }
    },
    trustwallet: {
        package: web3_provider_1.default,
        options: {
            infuraId: "1e9c56c0a90243e0899ae4123eff056f",
        }
    },
    huobiwallet: {
        package: web3_provider_1.default,
        options: {
            infuraId: "1e9c56c0a90243e0899ae4123eff056f",
        }
    },
    // walletlink: {
    //   package: WalletLink, // Required
    //   options: {
    //     appName: "MyApp", // Required
    //     infuraId: "1e9c56c0a90243e0899ae4123eff056f", // Required unless you provide a JSON RPC url; see `rpc` below
    //     // rpc: "", // Optional if `infuraId` is provided; otherwise it's required
    //     // chainId: 1, // Optional. It defaults to 1 if not provided
    //     // appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
    //     // darkMode: false // Optional. Use dark theme, defaults to false
    //   }
    // }
};
const web3Modal = new web3modal_1.default({
    cacheProvider: true,
    providerOptions,
    // theme: {
    //   background: "rgb(39, 49, 56)",
    //   main: "rgb(199, 199, 199)",
    //   secondary: "rgb(136, 136, 136)",
    //   border: "rgba(195, 195, 195, 0.14)",
    //   hover: "rgb(19,20,25)"
    // }
});
/**
 * 大数转常数
 * @param number 大数
 * @param decimals 精度(可选)
 * @returns string
 */
function convertBigNumberToNormal(number, decimals = 18, fix = 10) {
    let result = new bignumber_js_1.BigNumber(number).dividedBy(new bignumber_js_1.BigNumber(Math.pow(10, decimals)));
    return result.toFixed(fix);
}
exports.convertBigNumberToNormal = convertBigNumberToNormal;
/**
 * 常数转大数
 * @param number 常数
 * @param decimals 精度(选填)
 * @param fix 截取(选填)
 * @returns string
 */
function convertNormalToBigNumber(number, decimals = 18, fix = 0) {
    return new bignumber_js_1.BigNumber(number).multipliedBy(new bignumber_js_1.BigNumber(Math.pow(10, decimals))).minus(fix).toFixed(0);
}
exports.convertNormalToBigNumber = convertNormalToBigNumber;
/**
 * calculatePercentage
 * @param numerator x
 * @param denominator y
 * @returns string
 */
function calculatePercentage(numerator, denominator) {
    return new bignumber_js_1.BigNumber(numerator)
        .dividedBy(new bignumber_js_1.BigNumber(denominator))
        .toFixed();
}
exports.calculatePercentage = calculatePercentage;
/**
 * multipliedBy
 * @param number1 x
 * @param number2 y
 * @returns string
 */
function calculateMultiplied(number1, number2) {
    return new bignumber_js_1.BigNumber(number1).multipliedBy(new bignumber_js_1.BigNumber(number2)).toFixed(0);
}
exports.calculateMultiplied = calculateMultiplied;
/**
 * minus
 * @param number1 x
 * @param number2 y
 * @returns string
 */
function minusBigNumber(number1, number2) {
    return new bignumber_js_1.BigNumber(number1).minus(new bignumber_js_1.BigNumber(number2)).toFixed(0);
}
exports.minusBigNumber = minusBigNumber;
/**
 * 加 x+y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
function add(number1, number2) {
    return new bignumber_js_1.BigNumber(number1).plus(new bignumber_js_1.BigNumber(number2)).toFixed(10);
}
exports.add = add;
/**
 * 减 x-y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
function sub(number1, number2) {
    return new bignumber_js_1.BigNumber(number1).minus(new bignumber_js_1.BigNumber(number2)).toFixed(10);
}
exports.sub = sub;
/**
 * 乘 x*y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
function mul(number1, number2) {
    return new bignumber_js_1.BigNumber(number1).times(new bignumber_js_1.BigNumber(number2)).toFixed(10);
}
exports.mul = mul;
/**
 * 除  x/y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
function div(number1, number2) {
    return new bignumber_js_1.BigNumber(number1).div(new bignumber_js_1.BigNumber(number2)).toFixed(10);
}
exports.div = div;
//全局log
let isTrace = false;
/**
 * 删除数字末尾多余的0
 * @param str
 * @returns 字符串型的数字
 */
function toPrecision(str) {
    str = str + "";
    if (!(/^[0-9.]+$/g.test(str)))
        return '0';
    while (str.includes(".") && (str.endsWith('.') || str.endsWith('0'))) {
        str = str.slice(0, -1);
    }
    return str;
}
exports.toPrecision = toPrecision;
/**
 * 转千分位
 * @param num
 * @returns
 */
function toThousands(num) {
    if (+num < 1000)
        return num + "";
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    num = num + "";
    if (num.includes('.')) {
        let [_integer, _decimal] = num.split('.');
        return _integer.replace(reg, '$&,') + '.' + _decimal;
    }
    else {
        return num.replace(reg, '$&,');
    }
}
exports.toThousands = toThousands;
/**
 *设置log的开关
 * @param b bool
 */
function setTraceShow(b) {
    isTrace = b;
}
exports.setTraceShow = setTraceShow;
/**
 * log的内容
 * @param message log提示
 * @param optionalParams log内容
 */
function trace(message, ...optionalParams) {
    if (isTrace) {
        console.log(message, ...optionalParams);
    }
}
exports.trace = trace;
/**
 * deadline
 * @param delay time
 * @returns timestemp
 */
function getDeadLine(delay) {
    return Math.floor(new Date().getTime() / 1000 + 60 * delay);
}
exports.getDeadLine = getDeadLine;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
exports.sleep = sleep;
/**
 * 通过value找key
 * @param obj 对象
 * @param value value
 * @param compare 比较(可选)
 * @returns key
 */
function findToken(obj, value, compare = (a, b) => a.toLowerCase() === b.toLowerCase()) {
    return Object.keys(obj).find((k) => compare(obj[k].address, value));
}
exports.findToken = findToken;
/**
 * 根据token symbol获取address
 * @param symbol
 * @returns
 */
function getTokenAddress(symbol) {
    let index = lib_config_1.tokens.findIndex(item => item.symbol === symbol);
    if (index === -1) {
        symbol = symbol == "ETH" ? "WETH" : "ETH";
    }
    let token = lib_config_1.tokens.find(item => item.symbol === symbol);
    return token.id;
}
exports.getTokenAddress = getTokenAddress;
/**
 * 根据token address,获取symbol
 * @param token_address
 * @returns
 */
function getTokenSymbol(address) {
    let token = lib_config_1.tokens.find(item => item.id === address);
    return token.symbol;
}
exports.getTokenSymbol = getTokenSymbol;
/**
 * 获取池子地址
 * @param token0_address
 * @param token1_address
 * @param fee
 * @returns
 */
function getPool(token0_address, token1_address) {
    let symbol0 = getTokenSymbol(token0_address);
    let symbol1 = getTokenSymbol(token1_address);
    let pool = lib_config_1.pools.find((item => (item.token0.symbol === symbol0 && item.token1.symbol === symbol1) || (item.token0.symbol === symbol1 && item.token1.symbol === symbol0)));
    return pool.id;
}
exports.getPool = getPool;
/**
 * 返回池子的详细信息
 * @param id
 * @returns
 */
function getPoolDetail(id) {
    return lib_config_1.pools.find(item => item.id === id);
}
exports.getPoolDetail = getPoolDetail;
/**
 * 判断是否为以太坊地址
 * @param token_address 地址
 * @returns bool
 */
async function isETHAddress(token_address) {
    try {
        var code = await exports.web3.eth.getCode(token_address);
        if (code === "0x") {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
}
exports.isETHAddress = isETHAddress;
/**
 * 查币的余额
 * @param token_address 币地址
 * @returns 余额 常数
 */
async function getBalance(token_address) {
    if (token_address == lib_config_1.ContractAddress[lib_config_1.userInfo.chainID].WETH) {
        let balance = await exports.web3.eth.getBalance(lib_config_1.userInfo.account);
        return convertBigNumberToNormal(balance, getDecimal(token_address)); //sting/1e18
    }
    else {
        let tokenContract = new exports.web3.eth.Contract(lib_config_1.ERC20, token_address);
        let balance = await tokenContract.methods.balanceOf(lib_config_1.userInfo.account).call();
        return convertBigNumberToNormal(balance, getDecimal(token_address));
    }
}
exports.getBalance = getBalance;
/**
 * 获取币的精度
 * @param address
 * @returns
 */
function getDecimal(address) {
    let token = lib_config_1.tokens.find(item => item.id == address);
    return parseInt(token.decimals);
}
exports.getDecimal = getDecimal;
/**
 * approve Token
 * @param token_address 币地址
 * @param destina_address 目标地址
 * @param callback 回调
 */
async function _approveToken(token_address, destina_address, callback) {
    let tokenContract = new exports.web3.eth.Contract(lib_config_1.ERC20, token_address);
    // let bigAmount = convertNormalToBigNumber("500000000000",  getDecimal(token_address));
    let bigAmount = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    executeContract(tokenContract, "approve", "0", [destina_address, bigAmount], callback);
}
exports._approveToken = _approveToken;
/**
 * 获取授权额度
 * @param token_address
 * @param destina_address
 * @returns
 */
async function _getAllowance(token_address, destina_address) {
    let tokenContract = new exports.web3.eth.Contract(lib_config_1.ERC20, token_address);
    let allowance = await tokenContract.methods.allowance(lib_config_1.userInfo.account, destina_address).call();
    return convertBigNumberToNormal(allowance, getDecimal(token_address));
}
exports._getAllowance = _getAllowance;
/**
 * 导入token
 * @returns
 */
async function importToken() {
    let _ethereum = window['ethereum'];
    const params = {
        type: "ERC20",
        options: {
            address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
            symbol: "BNB",
            decimals: 18,
            image: "https://etherscan.io/images/gen/binance_20.png",
        }
    };
    return await _ethereum.request({
        method: "wallet_watchAsset",
        params: params,
    });
}
exports.importToken = importToken;
/**
 * 链接钱包
 * @param callback
 * @returns
 */
async function connect(callback) {
    let resMsg = {
        account: "",
        chainID: 0,
        chain: "",
        balance: "0",
        message: "success",
        providerInfo: {},
    };
    try {
        const provider = await web3Modal.connect();
        resMsg.providerInfo = (0, web3modal_1.getProviderInfo)(provider);
        exports.web3 = new web3_1.default(provider);
        exports.multi = new multicall_1.MultiCall(new ethers_1.ethers.providers.Web3Provider(provider));
        lib_config_1.userInfo.account = (await exports.web3.eth.getAccounts())[0]?.toLocaleLowerCase();
        lib_config_1.userInfo.chainID = await exports.web3.eth.getChainId();
        lib_config_1.userInfo.chain = lib_config_1.chainIdDict[lib_config_1.userInfo.chainID];
        resMsg.account = lib_config_1.userInfo.account;
        resMsg.chainID = lib_config_1.userInfo.chainID;
        resMsg.chain = lib_config_1.userInfo.chain;
        let balance = await exports.web3.eth.getBalance(lib_config_1.userInfo.account);
        resMsg.balance = convertBigNumberToNormal(balance, 18);
        provider.on("accountsChanged", async (accounts) => {
            lib_config_1.userInfo.account = accounts[0]?.toLowerCase() ?? "";
            callback({
                account: lib_config_1.userInfo.account,
                chainID: lib_config_1.userInfo.chainID,
                chain: lib_config_1.chainIdDict[lib_config_1.userInfo.chainID],
                message: "accountsChanged",
            });
        });
        provider.on("chainChanged", async (chainId) => {
            lib_config_1.userInfo.chainID = Number(chainId);
            callback({
                account: lib_config_1.userInfo.account,
                chainID: lib_config_1.userInfo.chainID,
                chain: lib_config_1.chainIdDict[lib_config_1.userInfo.chainID],
                message: "chainChanged",
            });
        });
        provider.on("connect", (info) => {
            trace("connect----ignore---", info);
        });
        provider.on("disconnect", (error) => {
            trace("disconnect----error---", error);
            if (error == 1000) {
                lib_config_1.userInfo.account = "";
                lib_config_1.userInfo.chainID = 1;
                lib_config_1.userInfo.chain = lib_config_1.chainIdDict[lib_config_1.userInfo.chainID];
                callback({
                    account: lib_config_1.userInfo.account,
                    chainID: lib_config_1.userInfo.chainID,
                    chain: lib_config_1.userInfo.chain,
                    message: "disconnect",
                });
            }
        });
    }
    catch (e) {
        //@ts-ignore
        resMsg.message = e.message;
    }
    return resMsg;
}
exports.connect = connect;
/**
 * 退出
 * @returns
 */
function logout() {
    web3Modal.clearCachedProvider();
    localStorage.removeItem("walletconnect");
    lib_config_1.userInfo.account = "";
    lib_config_1.userInfo.chainID = 1;
    lib_config_1.userInfo.chain = lib_config_1.chainIdDict[lib_config_1.userInfo.chainID];
    return {
        account: lib_config_1.userInfo.account,
        chainID: lib_config_1.userInfo.chainID,
        chain: lib_config_1.userInfo.chain,
        message: "logout",
    };
}
exports.logout = logout;
/**
 * 一键添加切换智能链
 * @param chainName "PLAYGROUND" | "CLOVERTEST" | "MUMBAI"
 * @returns
 */
async function changeMetamaskChain(chainName) {
    let _ethereum = window['ethereum'];
    if (!_ethereum || !_ethereum.isMetaMask) {
        return;
    }
    const MUMBAIinfo = [{
            chainId: '0x13881',
            chainName: 'Polygon Testnet',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        }];
    const PLAYGROUNDinfo = [{
            chainId: '0x150',
            chainName: 'Multiple Testnet',
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://testnet.multiple.fi'],
            blockExplorerUrls: ['https://testnet.multiple.fi/'],
        }];
    const Cloverinfo = [{
            chainId: '0x3FF',
            chainName: 'Clover Testnet',
            nativeCurrency: {
                name: 'CLV',
                symbol: 'CLV',
                decimals: 18
            },
            rpcUrls: ['https://rpc.clover.finance'],
            blockExplorerUrls: ['https://clover.subscan.io/'],
        }];
    let data = [];
    switch (chainName) {
        case "MUMBAI":
            data = MUMBAIinfo;
            break;
        case "CLOVERTEST":
            data = Cloverinfo;
            break;
        case "PLAYGROUND":
            data = PLAYGROUNDinfo;
            break;
        default:
            console.log("--changeMetamaskChain--", chainName);
            break;
    }
    await _ethereum.request({ method: 'wallet_addEthereumChain', params: data }).catch();
}
exports.changeMetamaskChain = changeMetamaskChain;
/**
 * sign签名
 * @param callback
 */
async function sign(callback) {
    let _ethereum = window['ethereum'];
    try {
        const from = lib_config_1.userInfo.account;
        const msg = 'Multiple Acknowledge Terms,Signing is free and will not send a transaction';
        const sign = await _ethereum.request({
            method: 'personal_sign',
            params: [msg, from],
        });
        callback(1, sign);
    }
    catch (e) {
        callback(2, "ERROR:" + e.message);
    }
}
exports.sign = sign;
/**
 * 转账
 * @param token_address 币地址
 * @param to_address 收款地址
 * @param amount 数量 常数
 * @param callback 回调
 */
async function transfer(token_address, to_address, amount, callback) {
    let tokenContract = new exports.web3.eth.Contract(lib_config_1.ERC20, token_address);
    let bigAmount = convertNormalToBigNumber(amount, getDecimal(token_address));
    executeContract(tokenContract, "transfer", "0", [to_address, bigAmount], callback);
}
exports.transfer = transfer;
/**
 * 从**转账
 * @param token_address 币的地址
 * @param from_address 出账地址
 * @param to_address 入账地址
 * @param amount 数量 常数
 * @param callback 回调
 */
async function transferFrom(token_address, from_address, to_address, amount, callback) {
    let tokenContract = new exports.web3.eth.Contract(lib_config_1.ERC20, token_address);
    let bigAmount = convertNormalToBigNumber(amount, getDecimal(token_address));
    executeContract(tokenContract, "transferFrom", "0", [from_address, to_address, bigAmount], callback);
}
exports.transferFrom = transferFrom;
/**
 * 执行合约
 * @param contract 合约实例
 * @param methodName 方法
 * @param value value
 * @param params 参数
 * @param callback 回调
 */
async function executeContract(contract, methodName, value, params, callback) {
    let gasPrice = await exports.web3.eth.getGasPrice();
    gasPrice = Number(gasPrice) * 30 + "";
    let b = false;
    try {
        let call_res = await contract.methods[methodName](...params).call({
            from: lib_config_1.userInfo.account,
            value: value,
        });
        trace("call_res=", call_res);
        b = true;
    }
    catch (err) {
        trace("--------params--------", params);
        trace("executeContract-", err);
        let str = JSON.stringify(err);
        let id1 = str.indexOf("{");
        let id2 = str.lastIndexOf("}");
        let va = "";
        if (str.indexOf("Error:") >= 0) {
            va = str.slice(str.indexOf("Error"), id1);
            if (va.length < 8) {
                callback(4, str);
            }
            else {
                callback(4, va);
            }
            return;
        }
        str = str.slice(id1, id2 + 1);
        try {
            let aa = JSON.parse(str);
            if (aa.message) {
                va = aa.message;
            }
            else if (aa.originalError && aa.originalError.message) {
                va = aa.originalError.message;
            }
            else {
                va = str;
            }
        }
        catch (err2) {
            va = str;
        }
        if (va.length < 8) {
            va = JSON.stringify(err);
        }
        callback(4, va);
        b = false;
    }
    if (!b)
        return;
    // contract.methods[methodName](...params).estimateGas({ from: userInfo.account }).then(console.log)
    // contract.methods[methodName](...params).estimateGas().catch((e: any) => console.error("-----methodName----", e));
    contract.methods[methodName](...params)
        .send({ from: lib_config_1.userInfo.account, value: value, gasPrice: gasPrice })
        .once("transactionHash", function (hash) {
        callback(0, hash);
    })
        // .on("confirmation", function (confirmationNumber: number, receipt: any) {
        //   if (confirmationNumber === 1) {
        //     callback(1, receipt.transactionHash);
        //   }
        // })
        .once("receipt", function (receipt) {
        if (receipt.status === true) {
            callback(1, receipt.transactionHash);
        }
    })
        .on("error", function (error, message) {
        if (message && message.transactionHash) {
            callback(3, message.transactionHash);
        }
        else {
            callback(2, error.message);
        }
    });
}
exports.executeContract = executeContract;
/***
 * 发送数据
 */
async function post(url, query) {
    return fetch(url, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
    }).then((response) => response.json());
}
exports.post = post;
//# sourceMappingURL=lib.utils.js.map