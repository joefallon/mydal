import { Pool, PoolConfig } from 'mysql';
export declare class ConnectionPoolFactory {
    private static pool;
    static create(poolConfig: PoolConfig): Pool;
}
