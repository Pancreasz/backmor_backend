const fs = require('fs');
const { Client } = require('pg');
const secret = require('../newSecret.json')

const config = {
    user: 'admin888',
    host: 'cpre888.cd4ysw4ic6v5.ap-southeast-2.rds.amazonaws.com',
    database: 'maindb3',
    password: secret.db_password,
    port: 5432, // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false 
    },
};

let db;

(async function initializeDatabase() {
    db = new Client(config);
    try {
        await db.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database", err);
        throw err;
    }
})();


async function closedb(db) {
    try {
        await db.end();
        console.log("Disconnected from the database");
    } catch (err) {
        console.error("Error disconnecting from the database", err);
    }
}



async function test() {
    await db.query(`SELECT * FROM public.username_password WHERE username = 'slim'`, (err, res) => {
        if (err) {
            console.error(err)
        } else {
            console.log(res.rows)
        }
    })
}

// const haha = test()


module.exports = {
    db,
    closedb,
};
