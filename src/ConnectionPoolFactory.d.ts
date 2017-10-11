import { IPool, IPoolConfig } from 'mysql';
export declare class ConnectionPoolFactory {
    private static pool;
    static create(poolConfig: IPoolConfig): IPool;
}
