'use strict';

const db = require('../models/dbconnection');
import Product from '../models/Product.js';

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM products';
        db.query(sql, (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    },
    detail: (req, res) => {
        //Cach 1
        // let sql = 'SELECT * FROM products WHERE id = ?';
        // db.query(sql, [req.params.productId], (err, response) => {
        //     if (err) throw err;
        //     res.json(response[0]);
        // });

        //Cach 2
        Product.getById(req.params.productId, function (err, task) {
            if (err)  res.send(err);
            res.json(task);
        });
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?';
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err;
            res.json({
                message: 'Update success!'
            });
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products SET ?';
        db.query(sql, [data], (err, response) => {
            if (err) throw err;
            res.json({
                message: 'Insert success!'
            });
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?';
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err;
            res.json({
                message: 'Delete success!'
            });
        })
    }
}