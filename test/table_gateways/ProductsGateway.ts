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

    public createRow(product: Product, callback: (err: Error, insertId: number) => void) {
        let row = ProductsGateway.mapProductToRow(product);
        this.tableGateway.createRow(row, callback);
    }

    public retrieveRow(id: number, callback: (err: Error, product: Product) => void) {
        this.tableGateway.retrieveRow(id, retrieveRowCallback);

        function retrieveRowCallback(err: Error, row: Object[]) {
            if(err) {
                callback(err, null);
            } else if(row) {
                let product = ProductsGateway.mapRowToProduct(row);
                callback(null, product);
            } else {
                callback(null, null);
            }
        }
    }

    public updateRow(product: Product, callback: (err: Error, affectedRows: number) => void) {
        let row = ProductsGateway.mapProductToRow(product);
        this.tableGateway.updateRow(row, updateRowCallback);

        function updateRowCallback(err: Error, affectedRows: number) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, affectedRows);
            }
        }
    }

    public deleteRow(id: number, callback: (err: Error, affectedRows: number) => void) {
        this.tableGateway.deleteRow(id, callback);
    }

    public retrieveByDescription(description: string,
                                 callback: (err: Error, products: Product[]) => void) {
        this.tableGateway.retrieveRowsBy('description', description, retrieveRowsCallback);

        function retrieveRowsCallback(err: Error, rows: any[]) {
            if(err) {
                callback(err, null);
            } else {
                let products = [];

                for(let i = 0; i < rows.length; i++) {
                    let product = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(product);
                }

                callback(null, products);
            }
        }
    }

    public retrieveByIds(ids: number[], callback: (err: Error, products: Product[]) => void) {
        this.tableGateway.retrieveRowsByIds(ids, retrieveRowsCallback);

        function retrieveRowsCallback(err: Error, rows: any[]) {
            if(err) {
                callback(err, null);
            } else {
                let products = [];

                for(let i = 0; i < rows.length; i++) {
                    let p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }

                callback(null, products);
            }
        }
    }

    public retrieveByNullDescription(callback: (err: Error, products: Product[]) => void) {
        this.tableGateway.retrieveRowsByIsNull('description', retrieveCallback);

        function retrieveCallback(err: Error, rows: any[]) {
            if(err) {
                callback(err, null);
            } else {
                let products = [];

                for(let i = 0; i < rows.length; i++) {
                    let p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }

                callback(null, products);
            }
        }
    }

    public retrieveByDescriptionNotEqual(description: string,
                                         callback: (err: Error, products: Product[]) => void) {
        this.tableGateway.retrieveRowsByNotEqual('description', description, retrieveRowsCallback);

        function retrieveRowsCallback(err: Error, rows: any[]) {
            if(err) {
                callback(err, null);
            } else {
                let products = [];

                for(let i = 0; i < rows.length; i++) {
                    let p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }

                callback(null, products);
            }
        }
    }

    public setDescriptionNullWhereNameIs(value: string,
                                         callback: (err: Error, affectedRows: number) => void) {
        this.tableGateway.setFieldNullWhere('description', value, setFieldNullCallback);

        function setFieldNullCallback(err: Error, affectedRows: number) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, affectedRows);
            }
        }
    }

    public deleteWhereNameIs(name: string, callback: (err: Error, affectedRows: number) => any) {
        this.tableGateway.deleteRowsBy('name', name, setFieldNullCallback);

        function setFieldNullCallback(err: Error, affectedRows: number) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, affectedRows);
            }
        }
    }

    public countProductsByName(name: string, callback: (err: Error, count: number) => void) {
        this.tableGateway.countRowsByValue('name', name, countRowsByValueCallback);

        function countRowsByValueCallback(err: Error, count: number) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, count);
            }
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
