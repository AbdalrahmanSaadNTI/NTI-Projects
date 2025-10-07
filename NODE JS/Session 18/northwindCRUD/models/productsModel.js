const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

async function getAll() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', (err, results) => {
            if(err){
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function getById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE ProductID = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

async function store(product) {
    const { ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued } = product;
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO products (ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued], 
            (err, results) => {
                if(err){
                    return reject(err);
                }
                resolve();
            }
        );
    });
}

async function update(product) {
    const { ProductID, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued } = product;
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE products SET ProductName=?, QuantityPerUnit=?, UnitPrice=?, UnitsInStock=?, UnitsOnOrder=?, ReorderLevel=?, Discontinued=? WHERE ProductID=?',
            [ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued, ProductID],
            (err, results) => {
                if(err){
                    return reject(err);
                }
                resolve();
            }
        );
    });
}

async function destroy(id) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM products WHERE ProductID = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            resolve();
        });
    });
}

module.exports = {
    getAll,
    getById,
    store,
    update,
    destroy
}