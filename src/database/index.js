const sql = require('mysql')


const dbConnect = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "DucManh175",
    database: "react_leaflet_map",
})

module.exports = { dbConnect }