import { IPool } from "mysql";
import { Product } from "../entities/Product";
export declare class ProductsGateway {
    private tableName;
    private tableGateway;
    constructor(connectionPool: IPool);
    createRow(product: Product, callback: (err: Error, insertId: number) => void): void;
    retrieveRow(id: number, callback: (err: Error, product: Product) => void): void;
    updateRow(product: Product, callback: (err: Error, affectedRows: number) => void): void;
    deleteRow(id: number, callback: (err: Error, affectedRows: number) => void): void;
    retrieveByDescription(description: string, callback: (err: Error, products: Product[]) => void): void;
    retrieveByIds(ids: number[], callback: (err: Error, products: Product[]) => void): void;
    retrieveByNullDescription(callback: (err: Error, products: Product[]) => void): void;
    retrieveByDescriptionNotEqual(description: string, callback: (err: Error, products: Product[]) => void): void;
    setDescriptionNullWhereNameIs(value: string, callback: (err: Error, affectedRows: number) => void): void;
    deleteWhereNameIs(name: string, callback: (err: Error, affectedRows: number) => any): void;
    countProductsByName(name: string, callback: (err: Error, count: number) => void): void;
    private static mapProductToRow(product);
    private static mapRowToProduct(row);
}
