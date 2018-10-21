import {Pool} from "mysql";

import {Product} from "../entities/Product";
import {TableGateway} from "../../src/TableGateway";

export class ProductsGateway {
    private static readonly TABLE_NAME = 'products';

    private readonly _tableGateway: TableGateway;

    constructor(connectionPool: Pool) {
        this._tableGateway = new TableGateway(connectionPool, ProductsGateway.TABLE_NAME);
        this._tableGateway.setCreatedColumnName('created');
        this._tableGateway.setUpdatedColumnName('updated');
    }

    /**
     * @returns Returns the insert id of the row.
     */
    public async createRow(product: Product): Promise<number> {
        let row        = ProductsGateway.mapProductToRow(product);
        const insertId = await this._tableGateway.createRow(row);

        return insertId;
    }

    /**
     * @returns Retrieves the row with the given id if found, null otherwise.
     */
    public async retrieveRow(id: number): Promise<Product> {
        const row     = await this._tableGateway.retrieveRow(id);
        const product = ProductsGateway.mapRowToProduct(row);

        return product;
    }

    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    public async updateRow(product: Product): Promise<number> {
        const row          = ProductsGateway.mapProductToRow(product);
        const affectedRows = await this._tableGateway.updateRow(row);

        return affectedRows;
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
        const rows     = await this._tableGateway.retrieveRows('description', description);
        const products = [];
        rows.map((row: any) => {
            const product = ProductsGateway.mapRowToProduct(row);
            products.push(product);
        });

        return products;
    }

    /**
     * @returns Returns an array of Products.
     */
    public async retrieveByIds(ids: number[]): Promise<Product[]> {
        const rows     = await this._tableGateway.retrieveRowsByIds(ids);
        const products = [];
        rows.map((row: any) => {
            const p = ProductsGateway.mapRowToProduct(row);
            products.push(p);
        });

        return products;
    }

    /**
     * @returns Returns an array of Products.
     */
    public async retrieveByNullDescription(): Promise<Product[]> {
        const rows     = await this._tableGateway.retrieveRowsByIsNull('description');
        const products = [];

        rows.map((row: any) => {
            const p = ProductsGateway.mapRowToProduct(row);
            products.push(p);
        });

        return products;
    }

    /**
     * @returns Returns an array of Products.
     */
    public async retrieveByDescriptionNotEqual(description: string): Promise<Product[]> {
        const gateway  = this._tableGateway;
        const rows     = await gateway.retrieveRowsByNotEqual('description', description);
        const products = [];

        rows.map((row: any) => {
            const p = ProductsGateway.mapRowToProduct(row);
            products.push(p);
        });

        return products;
    }

    /**
     * @returns Returns the number of affected rows.
     */
    public async setDescriptionNullWhereNameIs(value: string): Promise<number> {
        const affectedRows = await this._tableGateway.setFieldNullWhere('description', value);

        return affectedRows;
    }

    /**
     * @returns Returns the number of affected rows.
     */
    public async deleteWhereNameIs(name: string): Promise<number> {
        const affectedRows = await this._tableGateway.deleteRowsBy('name', name);

        return affectedRows;
    }

    /**
     * @returns Returns the count.
     */
    public async countProductsByName(name: string): Promise<number> {
        const count = await this._tableGateway.countRowsByValue('name', name);

        return count;
    }

    private static mapProductToRow(product: Product): Object {
        return {
            'id':          product.getId(),
            'name':        product.getName(),
            'description': product.getDescription(),
            'price':       product.getPrice(),
            'created':     product.getCreated(),
            'updated':     product.getUpdated()
        };
    }

    private static mapRowToProduct(row: Object): Product {
        if(row == null) { return null; }

        let product = new Product();
        product.setId(row['id']);
        product.setName(row['name']);
        product.setDescription(row['description']);
        product.setPrice(row['price']);
        product.setCreated(row['created']);
        product.setUpdated(row['updated']);

        return product;
    }
}
