import { AbiItem } from "web3-utils";
export declare const ERC20: AbiItem[];
export declare const ORACLE: AbiItem[];
export declare const BONDING: AbiItem[];
export declare const EARN: AbiItem[];
export declare const chainIdDict: {
    1: string;
    3: string;
    4: string;
    5: string;
    42: string;
    56: string;
    97: string;
    128: string;
    336: string;
    1023: string;
    80001: string;
    43113: string;
    43114: string;
};
export declare const userInfo: {
    account: string;
    chainID: 1 | 80001;
    chain: "Ethereum" | "Mumbai";
};
export declare const ContractAddress: {
    1: {
        earn: string;
        amaticb: string;
        sikka: string;
        skusd: string;
        oracle: string;
        bonding: string;
        WETH: string;
        gql: string;
        daily: string;
        dashboard: string;
        userAction: string;
    };
    80001: {
        earn: string;
        amaticb: string;
        sikka: string;
        skusd: string;
        oracle: string;
        bonding: string;
        WETH: string;
        gql: string;
        daily: string;
        dashboard: string;
        userAction: string;
    };
};
export interface tokenItem {
    decimals: string;
    id: string;
    symbol: string;
}
/**
 * tokens
 */
export declare var tokens: tokenItem[];
export interface poolItem {
    id: string;
    token0: tokenItem;
    token1: tokenItem;
}
/**
 * pools
 */
export declare var pools: poolItem[];
