const express = require('express');
const webRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

const productsController = require('../controllers/productsController');
const customersController = require('../controllers/customersController');
/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


/* -------------- multer ------------------- */
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/customers/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

/* -------------------products route roles----------------------- */
webRouter.get('/products', (req, res) => {
    productsController.index(req, res);
});
webRouter.get('/products/show/:id', (req, res) => {
    productsController.show(req, res);
});
webRouter.get('/products/createForm', (req, res) => {
    productsController.createForm(req, res);
});
webRouter.post('/products/store', (req, res) => {
    productsController.store(req, res);
});
webRouter.get('/products/updateForm/:id', (req, res) => {
    productsController.updateForm(req, res);
});
webRouter.post('/products/updateForm', (req, res) => {
    productsController.update(req, res);
});
/* ---****---- */
webRouter.post('/products/destroy/:id', (req, res) => {
    productsController.destroy(req, res);
});
/* -------------------customers route roles----------------------- */
webRouter.get('/customers', (req, res) => {
    customersController.index(req, res);
});
webRouter.get('/customers/show/:id', (req, res) => {
    customersController.show(req, res);
});
webRouter.get('/customers/createForm', (req, res) => {
    customersController.createForm(req, res);
});
webRouter.post('/customers/store', upload.single('photo'), (req, res) => {
    customersController.store(req, res);
});
webRouter.get('/customers/updateForm/:id', (req, res) => {
    customersController.updateForm(req, res);
});
webRouter.get('/customers/updateForm', (req, res) => {
    customersController.update(req, res);
});
webRouter.post('/customers/destroy/:id', (req, res) => {
    customersController.destroy(req, res);
});
/* ----------------------------------------------------- */
module.exports = webRouter;