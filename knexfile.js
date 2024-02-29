
import dotenv from 'dotenv/config'

export default {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/config/migrations',
      extension: 'cjs'

    },
    seeds: {
      directory: './src/config/seeds',
      extension: 'cjs'
    },
    acquireConnectionTimeout: 10000

  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/config/migrations',
      extension: 'cjs'

    },
    seeds: {
      directory: './src/config/seeds',
      extension: 'cjs'
    },
    acquireConnectionTimeout: 10000

  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/config/migrations',
      extension: 'cjs'

    },
    seeds: {
      directory: './src/config/seeds',
      extension: 'cjs'
    },
    acquireConnectionTimeout: 10000

  }

};
