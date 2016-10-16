import Product = require('../entities/Product');
import { IError, IPool } from 'mysql';
declare class ProductsGateway {
    private tableName;
    private tableGateway;
    constructor(connectionPool: IPool);
    createRow(product: Product, callback: (err: IError, insertId: number) => void): void;
    retrieveRow(id: number, callback: (err: IError, product: Product) => void): void;
    updateRow(product: Product, callback: (err: IError, affectedRows: number) => void): void;
    deleteRow(id: number, callback: (err: IError, affectedRows: number) => void): void;
    retrieveByDescription(description: string, callback: (err: IError, products: Product[]) => void): void;
    retrieveByIds(ids: number[], callback: (err: IError, products: Product[]) => void): void;
    retrieveByNullDescription(callback: (err: IError, products: Product[]) => void): void;
    retrieveByDescriptionNotEqual(description: string, callback: (err: IError, products: Product[]) => void): void;
    setDescriptionNullWhereNameIs(value: string, callback: (err: IError, affectedRows: number) => void): void;
    deleteWhereNameIs(name: string, callback: (err: IError, affectedRows: number) => any): void;
    countProductsByName(name: string, callback: (err: IError, count: number) => void): void;
    private static mapProductToRow(product);
    private static mapRowToProduct(row);
}
export = ProductsGateway;
