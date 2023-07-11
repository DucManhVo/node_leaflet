const db = require('../database/index')



function routes(app) {
    app.get('/', (req, res) => {
        const q = "SELECT ci_id, device_id, device_latitude, device_longitude, ci_address, ci_description, cus_name FROM (customer_iot INNER JOIN area ON customer_iot.area_code = area.area_code) INNER JOIN customers ON customer_iot.cus_id = customers.cus_id"

        db.dbConnect.query(q, (err, data) => {
            if (err) return res.json(err)
            else {
                return res.json(data)
            }
        })
    })

    app.get('/customer', (req, res) => {
        const q = "SELECT DISTINCT customer_iot.cus_id, cus_name FROM (customer_iot INNER JOIN area ON customer_iot.area_code = area.area_code) INNER JOIN customers ON customer_iot.cus_id = customers.cus_id"

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

    app.post('/create', (req, res) => {
        const q = "INSERT INTO customer_iot ( `ci_id`, `device_id`, `device_latitude`, `device_longitude`, `ci_address`, `ci_description`, `cus_id`, `area_code`) VALUES (?)";
        const values = [
            req.body.ci_id,
            req.body.device_id,
            req.body.device_latitude,
            req.body.device_longitude,
            req.body.ci_address,
            req.body.ci_description,
            req.body.cus_id,
            req.body.area_code
        ];
        db.dbConnect.query(q, [values], (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
        });
    })

    app.delete("/delete/:ci_id", (req, res) => {
        const deviceId = req.params.ci_id;
        const q = " DELETE FROM customer_iot WHERE ci_id = ? ";

        db.dbConnect.query(q, [deviceId], (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
        });
    });

    app.put("/update/:ci_id", (req, res) => {
        const deviceId = req.params.ci_id;
        const q = "UPDATE customer_iot SET `ci_id`= ?, `device_id`= ?, `device_latitude`= ?, `device_longitude`= ?, `ci_address`= ?, `ci_description`= ?, `cus_id`= ?, `area_code`= ? WHERE ci_id = ?";
        const values = [
            req.body.ci_id,
            req.body.device_id,
            req.body.device_latitude,
            req.body.device_longitude,
            req.body.ci_address,
            req.body.ci_description,
            req.body.cus_id,
            req.body.area_code
        ];
        db.dbConnect.query(q, [...values, deviceId], (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
        });
    });
}


module.exports = routes;