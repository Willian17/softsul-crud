const knex = require('knex')
const configuration = require('../../knexfile')

const database = knex(configuration.development)

module.exports = database