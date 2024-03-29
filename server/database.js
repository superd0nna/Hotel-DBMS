const { response } = require("express")
const {Pool} = require("pg") // taking everything from pg and putting it into pool

const pool = new Pool({
    user: "postgres",
    password: "alskdjfhg",
    host: "localhost",
    port: 5432,
});

pool
.query("CREATE DATABASE ehotel2;")
.then((Response) => {
    console.log("Database created")
    console.log(response)
})
.catch((err) => {
    console.log("Error creating the database: ", err);
});

module.exports = pool;