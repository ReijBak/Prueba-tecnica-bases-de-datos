import pg from 'pg';

// Database
export const pool = new pg.Pool({
    user: "root",
    host: "168.119.183.3",
    database: "pd_juan_cardona_van_rossum_v3",
    password: "s7cq453mt2jnicTaQXKT",
    port: 5432
});


// Conexion
pool.connect()
  .then(() => console.log('Conectado a PostgreSQL'))