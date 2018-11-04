# mydal

A simple JavaScript data access layer and table gateway implementation for MySQL.

By [Joe Fallon](http://blog.joefallon.net)

MyDAL has the following features:

*   Promise support.
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

Additionally, there is a factory called <code>ConnectionPoolFactory</code> for creating 
MySQL connection pools.

```
public static create(poolConfig: PoolConfig): Pool;
````

### Entities

An entity represents a single row within a database. Another name for
this type of object is data transfer object (DTO). Here is an
example entity class for a row in a <code>products</code> table.

```
export class Product {
    public id:          number;
    public name:        string;
    public description: string;
    public price:       number;
    public created:     string;
    public updated:     string;

    public constructor() {
        this.created     = '';
        this.description = null;
        this.id          = 0;
        this.name        = '';
        this.price       = 0;
        this.updated     = '';
    }
}
```

### TableGateway

Both of these classes are designed to be wrapped by classes that you
create. The classes that you create can selectively expose the functionality
provided. 

The <code>TableGateway</code> class is designed to access all tables
in the database that are not join (or associative) tables.
 
At a minimum, a class accessed by the <code>TableGateway</code> needs a
primary key. The name of the primary key will default to <code>id</code>
if one is not provided.

Optionally, two additional columns are provided for <code>created</code>
and <code>updated</code> timestamps. The name of those to columns is
configurable by you.

The <code>TableGateway</code> provides the following constructor:

```
// If no primary key is supplied, then "id" is assumed.
constructor(connectionPool: Pool, tableName: string, primaryKey = 'id');
```

The <code>TableGateway</code> provides the following promise style data access and 
modification methods: 

```
// Returns the inserted row with the inserted primary key (e.g. id) added.
createRow(row: any): Promise<any>;

retrieveRow(id: number): Promise<any>;

updateRow(row: any): Promise<number>;

deleteRow(id: number): Promise<number>;

retrieveRows(fieldName: string, fieldValue: any): Promise<any[] | null>;

retrieveRowsByIds(ids: number[]): Promise<any[]>;

retrieveRowsByIsNull(fieldName: string): Promise<any[]>;

retrieveRowsByNotEqual(fieldName: string, fieldValue: any): Promise<any[]>;

setFieldNullWhere(fieldName: string, fieldValue: any): Promise<number>;

deleteRowsBy(fieldName: string, fieldValue: any): Promise<number>;

countRowsByValue(fieldName: string, fieldValue: any): Promise<number>;
```

The the following methods are used to set the optional created and updated timestamp columns names: 

```
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

```
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
```

It is also possible to forgo data mappers and return the results directly.

### JoinTableGateway

The <code>JoinTableGateway</code> is used to manage access to an
associative table that represents a many-to-many relationship.

As a review, a join table must consist of two fields, at a minimum. 
Each field is a foreign-key to another table. Optionally, a column
with a timestamp to represent the time created is provided as well.
It is assumed that the combination of the two foreign key fields
is unique.

### Example JoinTableGateway

```
import {Pool} from "mysql";
import {JoinTableGateway} from "../../src/JoinTableGateway";

export class OrdersProductsGateway {
    private readonly tableName = 'orders_products';
    private readonly id1Name   = 'table1_id';
    private readonly id2Name   = 'table2_id';

    private joinTableGateway: JoinTableGateway;

    constructor(connectionPool: Pool) {
        let table = this.tableName;
        let id1   = this.id1Name;
        let id2   = this.id2Name;
        this.joinTableGateway = new JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }

    public createRow(id1: number, id2: number): Promise<boolean> {
        return this.joinTableGateway.createRow(id1, id2);
    }

    public retrieveRow(id1: number, id2: number): Promise<any> {
        return this.joinTableGateway.retrieveRow(id1, id2);
    }

    public deleteRow(id1: number, id2: number): Promise<number> {
        return this.joinTableGateway.deleteRow(id1, id2);
    }

    public retrieveByTable1Id(id1: number): Promise<any[]> {
        return this.joinTableGateway.retrieveById('table1_id', id1);
    }

    public deleteByTable1Id(id1: number): Promise<number> {
        return this.joinTableGateway.deleteById('table1_id', id1);
    }
}
```





