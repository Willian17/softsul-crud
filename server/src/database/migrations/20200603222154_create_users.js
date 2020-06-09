
exports.up = function(knex) {
  return knex.schema.createTable('users' , function(table){
      table.increments();
      table.string('name' , 30).notNullable();
      table.string('email' , 50).notNullable().unique();
      table.string('password' , 50).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
