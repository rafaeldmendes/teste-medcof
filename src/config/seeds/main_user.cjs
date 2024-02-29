/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function (knex) {
  const bcrypt = require('bcrypt')
  const password = await bcrypt.hash(process.env.ROOT_PASSWORD, 10)
  return await knex('users').insert([
    { name: 'root', username: process.env.ROOT_USER, password: password, root: true }
  ]);


};
