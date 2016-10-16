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
class Product {
    private _id:number          = 0;
    private _name:string        = '';
    private _description:string = null;
    private _price:number       = 0;
    private _created:string     = '';
    private _updated:string     = '';


    public getId():number {
        return this._id;
    }

    public setId(value:number) {
        this._id = value;
    }

    public getName():string {
        return this._name;
    }

    public setName(value:string) {
        this._name = value;
    }

    public getDescription():string {
        return this._description;
    }

    public setDescription(value:string) {
        this._description = value;
    }

    public getPrice():number {
        return this._price;
    }

    public setPrice(value:number) {
        this._price = value;
    }

    public getCreated():string {
        return this._created;
    }

    public setCreated(value:string) {
        this._created = value;
    }

    public getUpdated():string {
        return this._updated;
    }

    public setUpdated(value:string) {
        this._updated = value;
    }
}

export = Product;
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
constructor(connectionPool:IPool, tableName:string, primaryKey = 'id');

// Data access/modification methods
createRow(obj:any, callback:(err:IError, insertId:number) => void);
retrieveRow(id:number, cb:(err:IError, row:Object) => void);
updateRow(row:any, cb:IAffectedRowsCallback);
deleteRow(id:number, cb:IAffectedRowsCallback);
retrieveRowsBy(fieldName:string, fieldValue:any, callback:IRetrieveRowsCallback);
retrieveRowsByIds(ids:number[], cb:IRetrieveRowsCallback);
retrieveRowsByIsNull(fieldName:string, cb:IRetrieveRowsCallback);
retrieveRowsByNotEqual(fieldName:string, fieldValue:any, cb:IRetrieveRowsCallback);
setFieldNullWhere(fieldName:string, fieldValue:any, cb:IAffectedRowsCallback);
deleteRowsBy(fieldName:string, fieldValue:any, cb:IAffectedRowsCallback);
countRowsByValue(fieldName:string, fieldValue:any, cb:ICountRowsCallback);

// Used to set optional timestamp columns.
setCreatedColumnName(value:string);
setUpdatedColumnName(value:string);

// Interfaces
interface IAffectedRowsCallback { (err:IError, affectedRows:number):void }
interface ICountRowsCallback    { (err:IError, count:number):void }
interface IRetrieveRowsCallback { (err:IError, rows:any[]):void }
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
import Product      = require('../entities/Product');
import TableGateway = require('../../src/TableGateway');

import {IError} from "mysql";
import {IPool} from "mysql";

class ProductsGateway {
    private _tableName:string = 'products';
    private _tableGateway:TableGateway;

    constructor(connectionPool:IPool) {
        this._tableGateway = new TableGateway(connectionPool, this._tableName);
        this._tableGateway.setCreatedColumnName('created');
        this._tableGateway.setUpdatedColumnName('updated');
    }

    public createRow(product:Product, callback:(err:IError, insertId:number) => void) {
        let row = ProductsGateway.mapProductToRow(product);
        this._tableGateway.createRow(row, callback);
    }

    public retrieveRow(id:number, callback:(err:IError, product:Product) => void) {
        this._tableGateway.retrieveRow(id, retrieveRowCallback);

        function retrieveRowCallback(err:IError, row:Object[]) {
            if(err) {
                callback(err, null);
            } else {
                if(row.length === 0) {
                    callback(null, null);
                }

                let product = ProductsGateway.mapRowToProduct(row[0]);
                callback(null, product);
            }
        }
    }

    public updateRow(product:Product, callback:(err:IError, affectedRows:number) => void) {
        let row = ProductsGateway.mapProductToRow(product);
        this._tableGateway.updateRow(row, updateRowCallback);

        function updateRowCallback(err:IError, affectedRows:number) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, affectedRows);
            }
        }
    }

    public deleteRow(id:number, callback:(err:IError, affectedRows:number)=>void) {
        this._tableGateway.deleteRow(id, callback);
    }

    public retrieveByDescription(description:string, callback:(err:IError, products:Product[])=>void) {
        this._tableGateway.retrieveRowsBy('description', description, retrieveRowsCallback);

        function retrieveRowsCallback(err:IError, rows:any[]) {
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

    public retrieveByIds(ids:number[], cb:(err:IError, products:Product[])=>void) {
        this._tableGateway.retrieveRowsByIds(ids, retrieveRowsCallback);

        function retrieveRowsCallback(err:IError, rows:any[]) {
            if(err) {
                cb(err, null);
            } else {
                let products = [];

                for(let i = 0; i < rows.length; i++) {
                    let p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }

                cb(null, products);
            }
        }
    }

    public retrieveByNullDescription(cb:(err:IError, products:Product[])=>void) {
        this._tableGateway.retrieveRowsByIsNull('description', retrieveCallback);

        function retrieveCallback(err:IError, rows:any[]) {
            if(err) {
                cb(err, null);
            } else {
                let products = [];

                for(let i = 0; i < rows.length; i++) {
                    let p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }

                cb(null, products);
            }
        }
    }

    public retrieveByDescriptionNotEqual(desc:string, cb:(err:IError, products:Product[])=>void) {
        this._tableGateway.retrieveRowsByNotEqual('description', desc, retrieveCallback);

        function retrieveCallback(err:IError, rows:any[]) {
            if(err) {
                cb(err, null);
            } else {
                let products = [];

                for(let i = 0; i < rows.length; i++) {
                    let p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }

                cb(null, products);
            }
        }
    }

    public setDescriptionNullWhereNameIs(value:string, cb:(err:IError, affectedRows:number)=>void) {
        this._tableGateway.setFieldNullWhere('description', value, setFieldNullCallback);

        function setFieldNullCallback(err:IError, affectedRows:number) {
            if(err) {
                cb(err, null);
            } else {
                cb(null, affectedRows);
            }
        }
    }

    public deleteWhereNameIs(name:string, cb:(err:IError, affectedRows:number)=>any) {
        this._tableGateway.deleteRowsBy('name', name, setFieldNullCallback);

        function setFieldNullCallback(err:IError, affectedRows:number) {
            if(err) {
                cb(err, null);
            } else {
                cb(null, affectedRows);
            }
        }
    }

    public countProductsByName(name:string, cb:(err:IError, count:number)=>void) {
        this._tableGateway.countRowsByValue('name', name, countRowsByValueCallback);

        function countRowsByValueCallback(err:IError, count:number) {
            if(err) {
                cb(err, null);
            } else {
                cb(null, count);
            }
        }
    }

    private static mapProductToRow(product:Product):Object {
        return {
            'id':          product.getId(),
            'name':        product.getName(),
            'description': product.getDescription(),
            'price':       product.getPrice(),
            'created':     product.getCreated(),
            'updated':     product.getUpdated()
        };
    }

    private static mapRowToProduct(row:Object):Product {
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

export = ProductsGateway;
```

### Data Mapping

It is important that every class that wraps a JoinTable provide two
functions for data mapping to and from the database. These functions
create an entity object given a row and also create a row given an
entity object.

Here is an example of data mapper functions:

```typescript
private static mapProductToRow(product:Product):Object {
    return {
        'id':          product.getId(),
        'name':        product.getName(),
        'description': product.getDescription(),
        'price':       product.getPrice(),
        'created':     product.getCreated(),
        'updated':     product.getUpdated()
    };
}

private static mapRowToProduct(row:Object):Product {
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
import JoinTableGateway = require('../../src/JoinTableGateway');

import {IPool} from 'mysql';
import {IError} from 'mysql';

class OrdersProductsGateway {
    private _tableName = 'orders_products';
    private _id1Name   = 'table1_id';
    private _id2Name   = 'table2_id';
    private _joinTableGateway:JoinTableGateway;

    constructor(connectionPool:IPool) {
        let table = this._tableName;
        let id1   = this._id1Name;
        let id2   = this._id2Name;
        this._joinTableGateway = new JoinTableGateway(connectionPool, table, id1, id2);
        this._joinTableGateway.setCreatedColumnName('created');
    }

    public createRow(id1:number, id2:number, cb:(err:IError, isSuccess:boolean)=>void) {
        this._joinTableGateway.createRow(id1, id2, createRowCallback);

        function createRowCallback(err:IError, isSuccess:boolean) {
            if(err) {
                cb(err, false);
            } else {
                cb(null, isSuccess);
            }
        }
    }

    public retrieveRow(id1:number, id2:number, cb:(err:IError, row:any[])=>void) {
        this._joinTableGateway.retrieveRow(id1, id2, retrieveRowCallback);

        function retrieveRowCallback(err:IError, row:any[]) {
            if(err) {
                cb(err, null);
            } else {
                cb(null, row);
            }
        }
    }

    public deleteRow(id1:number, id2:number, cb:(err:IError, affectedRows:number)=>void) {
        this._joinTableGateway.deleteRow(id1, id2, cb);
    }

    public retrieveByTable1Id(id1:number, cb:(err:IError, rows:any[])=>void) {
        this._joinTableGateway.retrieveById('table1_id', id1, cb);
    }

    public deleteByTable1Id(id1:number, cb:(err:IError, affectedRows:number)=>void) {
        this._joinTableGateway.deleteById('table1_id', id1, cb);
    }
}

export = OrdersProductsGateway;
```

## Development

Commands:

```
Mac:
./db-migrate.sh up -e test

Linux:
./node_modules/db-migrate/bin/db-migrate up -e test
```



