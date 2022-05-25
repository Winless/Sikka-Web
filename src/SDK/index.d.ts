export { approveToken, provide, withdraw, swap, repay, borrow, repayCall, deposit, withdrawEarn } from "./execute";
export { add, sub, mul, div, setTraceShow, toThousands, trace, sleep, logout, sign, connect, importToken, toPrecision, getBalance, getTokenAddress, getTokenSymbol, getPool, isETHAddress, changeMetamaskChain } from "./lib.utils";
/**
 * 初始化
 */
export declare function init(): Promise<void>;
/**
 * gas币得数量
 * @returns
 */
export declare function getGasTokenBanlance(): Promise<string>;
/**
 * 获取池子地址
 * @returns
 */
export declare function getPoolList(): import("./lib_config").tokenItem[];
/**
 * 获取授权值
 * @param token_address
 * @param type
 * @returns
 */
export declare function getAllowance(token_address: string, type?: string): Promise<string>;
/**
 * 所有币的余额
 * @param tokenList
 * @returns
 */
export declare function getTokensBalance(tokenList: string[]): Promise<{
    id: string;
    symbol: string;
    balance: string;
}[]>;
export declare function getTokensBalance1(): Promise<{
    symbol: string;
    id: string;
    balance: string;
}[]>;
export declare function getBorrowInfo1(): Promise<{
    total: {
        totalLoan: string;
        totalBorrow: string;
        loanRate: string;
        borrowRate: string;
        payBackRate: string;
        liquidateRate: string;
        interestRate: number;
    };
    self: {
        calculateInterest: string;
        amountLoan: string;
        amountBorrow: string;
        liquidationPrice: number;
    };
    prices: {
        symbol: string;
        id: string;
        price: string;
    }[];
}>;
export declare function getBorrowInfo(): Promise<{
    total: {
        totalLoan: string;
        totalBorrow: string;
        loanRate: string;
        borrowRate: string;
        payBackRate: string;
        liquidateRate: string;
        interestRate: number;
    };
    self: {
        calculateInterest: string;
        amountLoan: string;
        amountBorrow: string;
        liquidationPrice: number;
    };
    prices: {
        symbol: string;
        id: string;
        price: string;
    }[];
}>;
export declare function getPrices(): Promise<{
    symbol: string;
    id: string;
    price: string;
}[]>;
export declare function getEarnInfo(): Promise<{
    interest: {
        day: number;
        week: number;
        month: number;
        year: number;
    };
    withdrowAmount: number;
}>;
/**
 * account页面信息
 * @returns
 */
export declare function getAccountInfo(): Promise<{
    deposit: number;
    borrow: string;
    USPAmount: string;
    sikkaPrice: number;
    earnapy: number;
    totalCollateral: string;
    totalCollateralUSP: number;
    totalCollateralValue: number;
    netApy: number;
    borrowLimit: number;
    schedule: number;
}>;
