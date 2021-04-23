const pg = require('pg');

const config = {
    database: 'weekend-to-do-app',
    host: 'Localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('Connected to prostgres');
});

pool.on('error', (err) => {
    console.log('error connecting to postgres', err);
    
});

module.exports = pool;