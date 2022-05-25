import { MultiCall } from '@indexed-finance/multicall';
import Web3 from "web3";
export declare var web3: Web3;
export declare var multi: MultiCall;
import { Contract } from "web3-eth-contract";
/**
 * 大数转常数
 * @param number 大数
 * @param decimals 精度(可选)
 * @returns string
 */
export declare function convertBigNumberToNormal(number: string, decimals?: number, fix?: number): string;
/**
 * 常数转大数
 * @param number 常数
 * @param decimals 精度(选填)
 * @param fix 截取(选填)
 * @returns string
 */
export declare function convertNormalToBigNumber(number: string, decimals?: number, fix?: number): string;
/**
 * calculatePercentage
 * @param numerator x
 * @param denominator y
 * @returns string
 */
export declare function calculatePercentage(numerator: string, denominator: string): string;
/**
 * multipliedBy
 * @param number1 x
 * @param number2 y
 * @returns string
 */
export declare function calculateMultiplied(number1: string, number2: string): string;
/**
 * minus
 * @param number1 x
 * @param number2 y
 * @returns string
 */
export declare function minusBigNumber(number1: string, number2: string): string;
/**
 * 加 x+y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
export declare function add(number1: string, number2: string): string;
/**
 * 减 x-y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
export declare function sub(number1: string, number2: string): string;
/**
 * 乘 x*y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
export declare function mul(number1: string, number2: string): string;
/**
 * 除  x/y
 * @param number1 x
 * @param number2 y
 * @returns string
 */
export declare function div(number1: string, number2: string): string;
/**
 * 删除数字末尾多余的0
 * @param str
 * @returns 字符串型的数字
 */
export declare function toPrecision(str: string): string;
/**
 * 转千分位
 * @param num
 * @returns
 */
export declare function toThousands(num: string): string;
/**
 *设置log的开关
 * @param b bool
 */
export declare function setTraceShow(b: boolean): void;
/**
 * log的内容
 * @param message log提示
 * @param optionalParams log内容
 */
export declare function trace(message?: string, ...optionalParams: any[]): void;
/**
 * deadline
 * @param delay time
 * @returns timestemp
 */
export declare function getDeadLine(delay: number): number;
export declare const sleep: (ms: number) => Promise<unknown>;
interface DictObject {
    [key: string]: {
        address: string;
        decimal: Number;
    };
}
/**
 * 通过value找key
 * @param obj 对象
 * @param value value
 * @param compare 比较(可选)
 * @returns key
 */
export declare function findToken(obj: DictObject, value: string, compare?: (a: string, b: string) => boolean): string | undefined;
/**
 * 根据token symbol获取address
 * @param symbol
 * @returns
 */
export declare function getTokenAddress(symbol: string): string;
/**
 * 根据token address,获取symbol
 * @param token_address
 * @returns
 */
export declare function getTokenSymbol(address: string): string;
/**
 * 获取池子地址
 * @param token0_address
 * @param token1_address
 * @param fee
 * @returns
 */
export declare function getPool(token0_address: string, token1_address: string): string;
/**
 * 返回池子的详细信息
 * @param id
 * @returns
 */
export declare function getPoolDetail(id: string): import("./lib_config").poolItem;
/**
 * 判断是否为以太坊地址
 * @param token_address 地址
 * @returns bool
 */
export declare function isETHAddress(token_address: string): Promise<boolean>;
/**
 * 查币的余额
 * @param token_address 币地址
 * @returns 余额 常数
 */
export declare function getBalance(token_address: string): Promise<string>;
/**
 * 获取币的精度
 * @param address
 * @returns
 */
export declare function getDecimal(address: string): number;
/**
 * approve Token
 * @param token_address 币地址
 * @param destina_address 目标地址
 * @param callback 回调
 */
export declare function _approveToken(token_address: string, destina_address: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * 获取授权额度
 * @param token_address
 * @param destina_address
 * @returns
 */
export declare function _getAllowance(token_address: string, destina_address: string): Promise<string>;
/**
 * 导入token
 * @returns
 */
export declare function importToken(): Promise<any>;
/**
 * 链接钱包
 * @param callback
 * @returns
 */
export declare function connect(callback: (data: {
    account: string;
    chainID: number;
    chain: string;
    message: string;
}) => void): Promise<{
    account: string;
    chainID: number;
    chain: string;
    balance: string;
    message: string;
    providerInfo: {};
}>;
/**
 * 退出
 * @returns
 */
export declare function logout(): {
    account: string;
    chainID: 1;
    chain: "Ethereum" | "Mumbai";
    message: string;
};
/**
 * 一键添加切换智能链
 * @param chainName "PLAYGROUND" | "CLOVERTEST" | "MUMBAI"
 * @returns
 */
export declare function changeMetamaskChain(chainName: "MUMBAI" | "PLAYGROUND" | "CLOVERTEST"): Promise<void>;
/**
 * sign签名
 * @param callback
 */
export declare function sign(callback: (code: number, hash: string) => void): Promise<void>;
/**
 * 转账
 * @param token_address 币地址
 * @param to_address 收款地址
 * @param amount 数量 常数
 * @param callback 回调
 */
export declare function transfer(token_address: string, to_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * 从**转账
 * @param token_address 币的地址
 * @param from_address 出账地址
 * @param to_address 入账地址
 * @param amount 数量 常数
 * @param callback 回调
 */
export declare function transferFrom(token_address: string, from_address: string, to_address: string, amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * 执行合约
 * @param contract 合约实例
 * @param methodName 方法
 * @param value value
 * @param params 参数
 * @param callback 回调
 */
export declare function executeContract(contract: Contract, methodName: string, value: string, params: any, callback: (code: number, hash: string) => void): Promise<void>;
/***
 * 发送数据
 */
export declare function post(url: string, query: string): Promise<any>;
export {};
