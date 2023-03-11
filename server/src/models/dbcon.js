import QueryBuilder from 'node-querybuilder';
import dotenv from 'dotenv';
dotenv.config();

const settings = {
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    database: process.env.DB_NAME ? process.env.DB_NAME : "ebay-analytics",
    user: process.env.DB_USER ? process.env.DB_USER : "root",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
    port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
    timezone: 'utc' //important!
};

const pool = new QueryBuilder(settings, 'mysql', 'pool');

const getQBuilder = (qb) => {
    return new Promise((resolve) => {
        if(qb) {
            console.log("!@#tracker", "qbuilder1", qb);
            return resolve(qb);
        }
        console.log("!@#tracker", "qbuilder1", qb);
        pool.get_connection(qb => {
            console.log("!@#tracker", "qbuilder2", qb);
            resolve(qb)
        })
    })
}

export default getQBuilder;