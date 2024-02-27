import knex from "knex";
import knexfile from "../../knexfile.js";
const connection = knex(knexfile[process.env.STATE_ENV]);

connection.select(1).then(() => console.log("Database connected")).catch(err => console.log("Database connection failed", err))

export default connection
