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

exports.up = function(db, callback) {
    var columnSpec = {
        id:          { type: 'int',     primaryKey: true, autoIncrement: true },
        name:        { type: 'string',  notNull: true},
        description: { type: 'string',  notNull: false},
        price:       { type: 'decimal', notNull: true, length: '10,2'},
        created:     { type: 'string',  notNull: true},
        updated:     { type: 'string',  notNull: true}
    };

    db.createTable('products', columnSpec, callback);
};

exports.down = function(db, callback) {
    db.dropTable('products', null, callback);
};
