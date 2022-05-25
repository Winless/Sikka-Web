/**
 * Dashboard界面图标
 */
export declare function getDashboardChart(): Promise<any>;
/**
 * 获取Dashboard的数据
 * @returns
 */
export declare function getDashboardInfo(): Promise<{
    interestRate: number;
    payBackRate: any;
    totalDeposit: number;
    totalCollateral: number;
    totalCollateralValue: number;
    yieldReserve: number;
    SIKKAPrice: any;
    totalBorrow: any;
    totalBorrowValue: number;
    depositAPY: number;
    aMATICbPrice: number;
    USPPrice: number;
    userCount: any;
}>;
/**
 * 获取apr数组  14天
 * @returns
 */
export declare function getApr(): Promise<any>;
/**
 * 交易记录
 * @returns
 */
export declare function getTransferAction(): Promise<any>;
/**
 * 主页页面数据
 * @returns
 */
export declare function getFirstPageInfo(): Promise<{
    userCount: any;
    tvl: number;
    volume7d: number;
    depositAPY: number;
    USPPrice: number;
}>;
/**
 * 登录成功调一次
 */
export declare function loginCall(): Promise<void>;
