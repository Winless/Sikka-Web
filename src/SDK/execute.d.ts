/**
 * 对token授权
 * @param token_address
 * @param type
 * @param callback
 */
export declare function approveToken(token_address: string, type: string | undefined, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * provide 存
 * @param amount
 * @param callback
 */
export declare function provide(amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * withdraw 提出
 * @param amount
 * @param callback
 */
export declare function withdraw(amount: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * swap
 * @param token0
 * @param token1
 * @param dx
 * @param dy
 * @param callback
 */
export declare function swap(token0: string, token1: string, dx: string, dy: string, callback: (code: number, hash: string) => void): void;
/**
 * borrow
 * @param amount0
 * @param callback
 */
export declare function borrow(amount0: string, callback: (code: number, hash: string) => void): Promise<void>;
/**
 * repay
 * @param amount
 * @param callback
 */
export declare function repay(amount: string, callback: (code: number, hash: string) => void): Promise<void>;
export declare function repayCall(amount: string): Promise<void>;
export declare function deposit(amount: string, callback: (code: number, hash: string) => void): Promise<void>;
export declare function withdrawEarn(amount: string, callback: (code: number, hash: string) => void): Promise<void>;
