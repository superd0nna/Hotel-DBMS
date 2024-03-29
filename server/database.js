const { response } = require("express")
const {Pool} = require("pg") // taking everything from pg and putting it into pool

const pool = new Pool({
    user: "postgres",
    password: "alskdjfhg",
    host: "localhost",
    database: 'postgres',
    port: 5432,
});


pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


pool.query('Select * from ehotel.hotel_chain', (err, res)=>{
    if (!err){
        console.log(res.rows);
    } else{
        console.log(err.message);
    }
    pool.end;
})

// pool
// .query("SELECT * FROM ehotel.hotel_chain")
// .then((Response) => {
//     console.log("Query successful")
//     console.log(response.rows)
// })
// .catch((err) => {
//     console.log("Error running query: ", err);
// });
// .query("CREATE DATABASE ehotel2;")
// .then((Response) => {
//     console.log("Database created")
//     console.log(response)
// })
// .catch((err) => {
//     console.log("Error creating the database: ", err);
// });

module.exports = pool;