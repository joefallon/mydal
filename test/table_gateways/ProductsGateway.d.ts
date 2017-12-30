import { Pool } from "mysql";
import { Product } from "../entities/Product";
export declare class ProductsGateway {
    private tableName;
    private tableGateway;
    constructor(connectionPool: Pool);
    createRow(product: Product, callback: (err: Error, insertId: number) => void): Promise<void>;
    retrieveRow(id: number, callback: (err: Error, product: Product) => void): Promise<void>;
    updateRow(product: Product, callback: (err: Error, affectedRows: number) => void): Promise<void>;
    deleteRow(id: number, callback: (err: Error, affectedRows: number) => void): Promise<void>;
    retrieveByDescription(description: string, callback: (err: Error, products: Product[]) => void): Promise<void>;
    retrieveByIds(ids: number[], callback: (err: Error, products: Product[]) => void): Promise<void>;
    retrieveByNullDescription(callback: (err: Error, products: Product[]) => void): Promise<void>;
    retrieveByDescriptionNotEqual(description: string, callback: (err: Error, products: Product[]) => void): Promise<void>;
    setDescriptionNullWhereNameIs(value: string, callback: (err: Error, affectedRows: number) => void): Promise<void>;
    deleteWhereNameIs(name: string, callback: (err: Error, affectedRows: number) => any): Promise<void>;
    countProductsByName(name: string, callback: (err: Error, count: number) => void): Promise<void>;
    private static mapProductToRow(product);
    private static mapRowToProduct(row);
}
