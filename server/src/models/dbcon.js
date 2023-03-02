import QueryBuilder from 'node-querybuilder';

const settings = {
    host: 'localhost',
    database: 'ebay-analytics',
    user: 'root',
    password: ''
};
const pool = new QueryBuilder(settings, 'mysql', 'pool');

const getQBuilder = () => {
    return new Promise((resolve) => {
        pool.get_connection(qb => {
            resolve(qb)
        })
    })
}

export default getQBuilder;