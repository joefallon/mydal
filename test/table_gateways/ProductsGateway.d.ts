import { Pool } from "mysql";
import { Product } from '../entities/Product';
export declare class ProductsGateway {
    private static readonly TABLE_NAME;
    private readonly _tableGateway;
    constructor(connectionPool: Pool);
    /**
     * @returns Returns the insert id of the row.
     */
    createRow(product: Product): Promise<number>;
    /**
     * @returns Retrieves the row with the given id if found, null otherwise.
     */
    retrieveRow(id: number): Promise<Product>;
    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    updateRow(product: Product): Promise<number>;
    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    deleteRow(id: number): Promise<number>;
    /**
     * @returns Returns an array of products.
     */
    retrieveByDescription(description: string): Promise<Product[]>;
    /**
     * @returns Returns an array of Products.
     */
    retrieveByIds(ids: number[]): Promise<Product[]>;
    /**
     * @returns Returns an array of Products.
     */
    retrieveByNullDescription(): Promise<Product[]>;
    /**
     * @returns Returns an array of Products.
     */
    retrieveByDescriptionNotEqual(description: string): Promise<Product[]>;
    /**
     * @returns Returns the number of affected rows.
     */
    setDescriptionNullWhereNameIs(value: string): Promise<number>;
    /**
     * @returns Returns the number of affected rows.
     */
    deleteWhereNameIs(name: string): Promise<number>;
    /**
     * @returns Returns the count.
     */
    countProductsByName(name: string): Promise<number>;
}
