import knex from "knex";
import knexfile from "../../knexfile.js";

await knex(knexfile[process.env.STATE_ENV]).migrate.latest(knexfile[process.env.STATE_ENV].migrations).then(() => {
    console.log("Database migrated");
}).catch((err) => {
    console.log("Database migration failed", err);
})
if (process.env.DEPLOY === "true") {
    await knex(knexfile[process.env.STATE_ENV]).seed.run(knexfile[process.env.STATE_ENV].seeds).then(() => {
        console.log("Database seeded");
    }).catch((err) => {
        console.log("Database seed failed", err);
    })

}

const connection = knex(knexfile[process.env.STATE_ENV]);
await connection.select(1).then(() => {
    console.log("Database connection established");
}).catch((err) => {
    console.log("Database connection failed", err);
});



export default connection;
