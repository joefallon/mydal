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
    db.dropTable('example_table', callback);
};

exports.down = function(db, callback) {
    var options = {
        id:       { type: 'int',      primaryKey: true, autoIncrement: true },
        name:     { type: 'string',   notNull: true },
        nullable: { type: 'string',   notNull: false, defaultValue: null },
        numeral:  { type: 'int',      notNull: true },
        created:  { type: 'datetime', notNull: true },
        updated:  { type: 'datetime', notNull: true }
    };

    db.createTable('example_table', options, callback);
};
