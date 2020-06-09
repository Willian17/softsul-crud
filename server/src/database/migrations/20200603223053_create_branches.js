
exports.up = function(knex) {
  return knex.schema.createTable('branches' , function(table){
      table.increments();
      table.string('name' , 30).notNullable();
      table.string('city' , 30).notNullable();
      table.string('CNPJ' , 30).notNullable();
      table.text('address').notNullable();
      table.string('email' , 50).notNullable();
      table.specificType('latitude' , 'double precision').notNullable();
      table.specificType('longitude' , 'double precision').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('branches')
};
