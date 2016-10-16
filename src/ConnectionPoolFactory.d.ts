import { IPool, IPoolConfig } from 'mysql';
declare class ConnectionPoolFactory {
    private static pool;
    static create(poolConfig: IPoolConfig): IPool;
}
export = ConnectionPoolFactory;
