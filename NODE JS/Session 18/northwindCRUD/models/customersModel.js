const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

async function getAll() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM customers', (err, results) => {
            if(err){
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function getById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

async function store(customer) {
    const { ContactName, CompanyName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, Image } = customer;
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO customers (ContactName, CompanyName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [ContactName, CompanyName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, Image], 
            (err, results) => {
                if(err){
                    return reject(err);
                }
                resolve();
            }
        );
    });
}

async function update(customer) {
    const { id, ContactName, CompanyName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, Image } = customer;
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE customers SET ContactName=?, CompanyName=?, ContactTitle=?, Address=?, City=?, Region=?, PostalCode=?, Country=?, Phone=?, Fax=?, Image=? WHERE id=?',
            [ContactName, CompanyName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, Image, id],
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
        connection.query('DELETE FROM customers WHERE id = ?', [id], (err, results) => {
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