# mydal

A simple JavaScript data access layer and table gateway implementation for MySQL.

By [Joe Fallon](http://blog.joefallon.net)

MyDAL has the following features:

*   Full suite of unit tests.
*   It can be integrated into any existing project.
*   Can be fully understood in just a few moments.
*   The library implements the data mapper design patter 
    (a.k.a. table gateway).
*   The mysql npm package is used for all data access.
*   Connection pooling is used by default.
*   Written in TypeScript.
    
## Installation

The easiest way to install MyDAL is with npm. 

```
npm install mydal --save
```

## Usage

There are two main classes that are used to represent all of the
relationships within the database.

```
TableGateway
JoinTableGateway
```

### Entities

An entity represents a single row within a database. Another name for
this type of object is data transfer object (DTO). Here is an
example entity class for a row in a <code>products</code> table.

```typescript
export class Product {
    private _id: number;
    private _name: string;
    private _description: string|null;
    private _price: number;
    private _created: string;
    private _updated: string;

    public constructor() {
        this._id          = 0;
        this._name        = '';
        this._description = null;
        this._price       = 0;
        this._created     = '';
        this._updated     = '';
    }

    public getId(): number {
        return this._id;
    }

    public setId(value: number) {
        this._id = value;
    }

    public getName(): string {
        return this._name;
    }

    public setName(value: string) {
        this._name = value;
    }

    public getDescription(): string|null {
        return this._description;
    }

    public setDescription(value: string) {
        this._description = value;
    }

    public getPrice(): number {
        return this._price;
    }

    public setPrice(value: number) {
        this._price = value;
    }

    public getCreated(): string {
        return this._created;
    }

    public setCreated(value: string) {
        this._created = value;
    }

    public getUpdated(): string {
        return this._updated;
    }

    public setUpdated(value: string) {
        this._updated = value;
    }
}
```

### TableGateway

Both of these classes are designed to be wrapped by classes that you
create. The classes that you create selectively expose functionality
provided. 

The <code>TableGateway</code> class is designed to access all tables
in the database that are not join (or associative) tables.
 
At a minimum, a class accessed by the <code>TableGateway</code> needs a
primary key. The name of the primary key will default to <code>id</code>
if one is not provided.

Optionally, two additional columns are provided for <code>created</code>
and <code>updated</code> timestamps. The name of those to columns is
configurable by you.

The <code>TableGateway</code> provides the following table access
functions:

```typescript
// Constructor
constructor(connectionPool: IPool, tableName: string, primaryKey?: string);

// Data access/modification methods
createRow(obj: any, callback: (err: Error, insertId: number) => void): void;
retrieveRow(id: number, callback: (err: Error, row: Object) => void): void;
updateRow(row: any, callback: (err: Error, affectedRows: number) => void): void;
deleteRow(id: number, callback: (err: Error, affectedRows: number) => void): void;
retrieveRowsBy(fieldName: string, fieldValue: any, callback: (err: Error, rows: any[]) => void): void;
retrieveRowsByIds(ids: number[], callback: (err: Error, rows: any[]) => void): void;
retrieveRowsByIsNull(fieldName: string, callback: (err: Error, rows: any[]) => void): void;
retrieveRowsByNotEqual(fieldName: string, fieldValue: any, callback: (err: Error, rows: any[]) => void): void;
setFieldNullWhere(fieldName: string, fieldValue: any, callback: (err: Error, affectedRows: number) => void): void;
deleteRowsBy(fieldName: string, fieldValue: any, callback: (err: Error, affectedRows: number) => void): void;
countRowsByValue(fieldName: string, fieldValue: any, callback: (err: Error, count: number) => void): void;
    

// Used to set optional timestamp columns.
setCreatedColumnName(value: string): void;
setUpdatedColumnName(value: string): void;
```

### Example Products Table Schema

```
Name        Type            Options
----------- --------------- ---------------------------
id          interger        non-null, autoincrement, pk
name        string          non-null
description string          nullable
price       decimal(10,2)   non-null
created     string          non-null
updated     string          non-null
```

### Example ProductsGateway

```typescript
import {IPool} from "mysql";
import {Product} from "../entities/Product";
import {TableGateway} from "../../src/TableGateway";


export class ProductsGateway {
    private tableName: string = 'products';
    private tableGateway: TableGateway;

    constructor(connectionPool: IPool) {
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

```

### Data Mapping

It is important that every class that wraps a JoinTable provide two
functions for data mapping to and from the database. These functions
create an entity object given a row and also create a row given an
entity object.

Here is an example of data mapper functions:

```typescript
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
```


### JoinTableGateway

The <code>JoinTableGateway</code> is used to manage access to an
associative table that represents a many-to-many relationship.

As a review, a join table must consist of two fields, at a minimum. 
Each field is a foreign-key to another table. Optionally, a column
with a timestamp to represent the time created is provided as well.

### Example JoinTableGateway

```typescript
import {IPool} from "mysql";
import {JoinTableGateway} from "../../src/JoinTableGateway";

export class OrdersProductsGateway {
    private tableName = 'orders_products';
    private id1Name = 'table1_id';
    private id2Name = 'table2_id';
    private joinTableGateway: JoinTableGateway;

    constructor(connectionPool: IPool) {
        let table = this.tableName;
        let id1 = this.id1Name;
        let id2 = this.id2Name;
        this.joinTableGateway = new JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }

    public createRow(id1: number, id2: number, callback: (err: Error, isSuccess: boolean) => void) {
        this.joinTableGateway.createRow(id1, id2, createRowCallback);

        function createRowCallback(err: Error, isSuccess: boolean) {
            if(err) {
                callback(err, false);
            } else {
                callback(null, isSuccess);
            }
        }
    }

    public retrieveRow(id1: number, id2: number, callback: (err: Error, row: any[]) => void) {
        this.joinTableGateway.retrieveRow(id1, id2, retrieveRowCallback);

        function retrieveRowCallback(err: Error, row: any[]) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        }
    }

    public deleteRow(id1: number, id2: number, callback: (err: Error, affectedRows: number) => void) {
        this.joinTableGateway.deleteRow(id1, id2, callback);
    }

    public retrieveByTable1Id(id1: number, callback: (err: Error, rows: any[]) => void) {
        this.joinTableGateway.retrieveById('table1_id', id1, callback);
    }

    public deleteByTable1Id(id1: number, callback: (err: Error, affectedRows: number) => void) {
        this.joinTableGateway.deleteById('table1_id', id1, callback);
    }
}
```

## Development

Commands:

```
Mac:
./db-migrate.sh up -e test

Linux:
./node_modules/db-migrate/bin/db-migrate up -e test
```



