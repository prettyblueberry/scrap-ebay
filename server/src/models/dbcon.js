import QueryBuilder from 'node-querybuilder';

const settings = {
    host: 'localhost',
    database: 'ebay-analytics',
    user: 'root',
    password: ''
};
const pool = new QueryBuilder(settings, 'mysql', 'pool');

const getQBuilder = (qb) => {
    return new Promise((resolve) => {
        if(qb) return resolve(qb);

        pool.get_connection(qb => {
            resolve(qb)
        })
    })
}

export default getQBuilder;