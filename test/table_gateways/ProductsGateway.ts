import {Pool} from "mysql";

import {TableGateway} from "../../src/TableGateway";
import { Product } from '../entities/Product';

export class ProductsGateway {
    private static readonly TABLE_NAME = 'products';

    private readonly _tableGateway: TableGateway;

    constructor(connectionPool: Pool) {
        this._tableGateway = new TableGateway(connectionPool, ProductsGateway.TABLE_NAME);
        this._tableGateway.setCreatedColumnName('created');
        this._tableGateway.setUpdatedColumnName('updated');
    }

    /**
     * @returns The inserted Product.
     */
    public async createRow(product: Product): Promise<Product> {
        return this._tableGateway.createRow(product);
    }

    /**
     * @returns Retrieves the row with the given id if found, null otherwise.
     */
    public async retrieveRow(id: number): Promise<Product> {
        return this._tableGateway.retrieveRow(id);
    }

    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    public async updateRow(product: Product): Promise<number> {
        return this._tableGateway.updateRow(product);
    }

    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    public async deleteRow(id: number): Promise<number> {
        return this._tableGateway.deleteRow(id);
    }

    /**
     * @returns Returns an array of products.
     */
    public async retrieveByDescription(description: string): Promise<Product[]> {
        return this._tableGateway.retrieveRows('description', description);
    }

    /**
     * @returns Returns an array of Products.
     */
    public async retrieveByIds(ids: number[]): Promise<Product[]> {
        return this._tableGateway.retrieveRowsByIds(ids);
    }

    /**
     * @returns Returns an array of Products.
     */
    public async retrieveByNullDescription(): Promise<Product[]> {
        return this._tableGateway.retrieveRowsByIsNull('description');
    }

    /**
     * @returns Returns an array of Products.
     */
    public async retrieveByDescriptionNotEqual(description: string): Promise<Product[]> {
        return this._tableGateway.retrieveRowsByNotEqual('description', description);
    }

    /**
     * @returns Returns the number of affected rows.
     */
    public async setDescriptionNullWhereNameIs(value: string): Promise<number> {
        return this._tableGateway.setFieldNullWhere('description', value);
    }

    /**
     * @returns Returns the number of affected rows.
     */
    public async deleteWhereNameIs(name: string): Promise<number> {
        return this._tableGateway.deleteRowsBy('name', name);
    }

    /**
     * @returns Returns the count.
     */
    public async countProductsByName(name: string): Promise<number> {
        return this._tableGateway.countRowsByValue('name', name);
    }
}
