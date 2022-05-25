export declare function getDayNum(startTime: number): number;
/**
 * 获取exchange
 * @returns
 */
export declare function getExchangeInfo(): Promise<{
    volume24h: number;
}>;
