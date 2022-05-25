/**
 * Dashboard界面图标
 */
export declare function getDashboardChart(): Promise<{
    ts: any;
    totalLoan: number;
    totalBorrow: number;
    totalDeposit: number;
    auspPrice: string;
}[]>;
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
