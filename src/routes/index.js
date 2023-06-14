const db = require('../database/index')


function routes(app) {
    app.get('/', (req, res) => {
        const q = "select device_id, device_latitude, device_longitude, ci_address, ci_description, cus_name from (customer_iot inner join area on customer_iot.area_code = area.area_code) inner join customers on customer_iot.cus_id = customers.cus_id"

        db.dbConnect.query(q, (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/customer', (req, res) => {
        const q = "select distinct customer_iot.cus_id, cus_name from (customer_iot inner join area on customer_iot.area_code = area.area_code) inner join customers on customer_iot.cus_id = customers.cus_id"

        db.dbConnect.query(q, (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/province', (req, res) => {
        const q = "SELECT area_code, area_name, area_type, area_parent FROM area WHERE area_type = \"province\""
        db.dbConnect.query(q, (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/district/:area_code', (req, res) => {
        const q = "SELECT area_code, area_name, area_type, area_parent FROM area WHERE area_type = \"district\" AND area_code LIKE concat(?, '%')"
        db.dbConnect.query(q, [req.params.area_code], (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/ward/:area_code', (req, res) => {
        const q = "SELECT area_code, area_name, area_type, area_parent FROM area WHERE area_type = \"ward\" AND area_code LIKE concat(?, '%')"
        db.dbConnect.query(q, [req.params.area_code], (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })
    app.get('/:cus_id', (req, res) => {
        const q = "select customer_iot.cus_id, cus_name, ci_id, ci_address, ci_description, device_latitude, device_longitude, device_id from (customer_iot inner join area on customer_iot.area_code = area.area_code) inner join customers on customer_iot.cus_id = customers.cus_id where customer_iot.cus_id = ? "
        db.dbConnect.query(q, [req.params.cus_id], (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/devices/province/:area_code', (req, res) => {
        const q = "SELECT customer_iot.cus_id, customer_iot.area_code, cus_name, ci_id, ci_address, ci_description, device_latitude, device_longitude, device_id FROM (customer_iot INNER JOIN area ON customer_iot.area_code = area.area_code) INNER JOIN customers ON customer_iot.cus_id = customers.cus_id WHERE customer_iot.area_code LIKE concat( ? , '%') "
        db.dbConnect.query(q, [req.params.area_code], (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/devices/district/:area_code', (req, res) => {
        const q = "SELECT customer_iot.cus_id, customer_iot.area_code, cus_name, ci_id, ci_address, ci_description, device_latitude, device_longitude, device_id FROM (customer_iot INNER JOIN area ON customer_iot.area_code = area.area_code) INNER JOIN customers ON customer_iot.cus_id = customers.cus_id WHERE customer_iot.area_code LIKE concat(?, '%') "
        db.dbConnect.query(q, [req.params.area_code], (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/devices/ward/:area_code', (req, res) => {
        const q = "SELECT customer_iot.cus_id, customer_iot.area_code, cus_name, ci_id, ci_address, ci_description, device_latitude, device_longitude, device_id FROM (customer_iot INNER JOIN area ON customer_iot.area_code = area.area_code) INNER JOIN customers ON customer_iot.cus_id = customers.cus_id WHERE customer_iot.area_code = ?"
        db.dbConnect.query(q, [req.params.area_code], (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

}


module.exports = routes;