'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db, cb) {
    var table = 'orders_products';

    var options = {
        id:        { type: 'int',   primaryKey: true, autoIncrement: true },
        table1_id: { type: 'int',   notNull: true },
        table2_id: { type: 'int',   notNull: true },
        created:   { type: 'datetime', notNull: true }
    };

    db.createTable(table, options, createTableCallback);

    function createTableCallback() {
        db.addIndex(table, 'orders_products_idx', ['table1_id', 'table2_id'], true, addIndexCallback);
    }

    function addIndexCallback() {
        db.removeColumn(table, 'id', cb);
    }
};

exports.down = function(db, cb) {
    db.dropTable('orders_products', cb);
};
