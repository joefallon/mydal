import {Pool} from "mysql";

import {Product} from "../entities/Product";
import {TableGateway} from "../../src/TableGateway";

export class ProductsGateway {
    private tableName: string = 'products';
    private tableGateway: TableGateway;

    constructor(connectionPool: Pool) {
        this.tableGateway = new TableGateway(connectionPool, this.tableName);
        this.tableGateway.setCreatedColumnName('created');
        this.tableGateway.setUpdatedColumnName('updated');
    }

    public async createRow(product: Product, callback: (err: Error, insertId: number) => void) {
        try {
            let row = ProductsGateway.mapProductToRow(product);
            const insertId = await this.tableGateway.createRow(row);
            callback(null, insertId);
        }
        catch(e) {
            const err: Error = e;
            callback(err, null);
        }
    }

    public async retrieveRow(id: number, callback: (err: Error, product: Product) => void) {
        try {
            const row     = await this.tableGateway.retrieveRow(id);
            const product = ProductsGateway.mapRowToProduct(row);
            callback(null, product);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async updateRow(product: Product, callback: (err: Error, affectedRows: number) => void) {
        try {
            const row = ProductsGateway.mapProductToRow(product);
            const affectedRows = await this.tableGateway.updateRow(row);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async deleteRow(id: number, callback: (err: Error, affectedRows: number) => void) {
        try {
            const affectedRows = await this.tableGateway.deleteRow(id);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async retrieveByDescription(description: string,
                                       callback: (err: Error, products: Product[]) => void) {
        try {
            const rows = await this.tableGateway.retrieveRows('description', description);
            const products = [];
            rows.map((row: any) => {
                const product = ProductsGateway.mapRowToProduct(row);
                products.push(product);
            });
            callback(null, products);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async retrieveByIds(ids: number[], callback: (err: Error, products: Product[]) => void) {
        try {
            const rows = await this.tableGateway.retrieveRowsByIds(ids);
            const products = [];
            rows.map((row: any) => {
                const p = ProductsGateway.mapRowToProduct(row);
                products.push(p);
            });
            callback(null, products);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async retrieveByNullDescription(callback: (err: Error, products: Product[]) => void) {
        try {
            const rows = await this.tableGateway.retrieveRowsByIsNull('description');
            const products = [];
            rows.map((row: any) => {
                const p = ProductsGateway.mapRowToProduct(row);
                products.push(p);
            });
            callback(null, products);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async retrieveByDescriptionNotEqual(description: string,
                                               callback: (err: Error, products: Product[]) => void) {
        try {
            const gateway  = this.tableGateway;
            const rows     = await gateway.retrieveRowsByNotEqual('description', description);
            const products = [];
            rows.map((row: any) => {
                const p = ProductsGateway.mapRowToProduct(row);
                products.push(p);
            });
            callback(null, products);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async setDescriptionNullWhereNameIs(value: string,
                                               callback: (err: Error, affectedRows: number) => void) {
        try {
            const affectedRows = await this.tableGateway.setFieldNullWhere('description', value);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async deleteWhereNameIs(name: string, callback: (err: Error, affectedRows: number) => any) {
        try {
            const affectedRows = await this.tableGateway.deleteRowsBy('name', name);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async countProductsByName(name: string, callback: (err: Error, count: number) => void) {
        try {
            const count = await this.tableGateway.countRowsByValue('name', name);
            callback(null, count);
        }
        catch(e) {
            callback(e, null);
        }
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
