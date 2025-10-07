const express = require('express');
const apiRouter = express.Router();

/* ------------- controllers ------------------- */

const productApiController = require('../controllers/productApiController');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const reportController = require('../controllers/reportController');

/* -------------- parse of form ------------------- */
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({
    extended: true
}));

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/uploads/");
    },
    filename: (req, file, cb) => {
        if(file){
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }
});

const upload = multer({
    storage: storage
});

/* -------------- route roles ------------------------ */
//////////////////////////
apiRouter.post('/signin', (req, res) => {
    authController.signin(req, res);
});

apiRouter.post('/signup', (req, res) => {
    authController.signup(req, res);
});
///////////////////////
apiRouter.use(authController.verifySignin);

/* -------------------products route roles----------------------- */
apiRouter.get('/products', (req, res) => {
    productApiController.index(req, res);
});
apiRouter.get('/myProducts', (req, res) => {
    productApiController.myProducts(req, res);
});
apiRouter.get('/products/show/:id', (req, res) => {
    productApiController.show(req, res);
});
/* apiRouter.get('/products/createForm', (req, res) => {
    productApiController.createForm(req, res);
}); */

/* ---****---- */
apiRouter.post('/products/store', upload.single('photo'), (req, res) => {
    productApiController.store(req, res);
});

apiRouter.get('/products/updateForm/:id', (req, res) => {
    productApiController.updateForm(req, res);
});
apiRouter.put('/products/update', upload.single('photo'), (req, res) => {
    productApiController.update(req, res);
});
apiRouter.delete('/products/destroy/:id', (req, res) => {
    productApiController.destroy(req, res);
});

/* -------------------categories route roles----------------------- */
apiRouter.get('/categories', (req, res) => {
    categoryController.index(req, res);
});
apiRouter.get('/categories/:id', (req, res) => {
    categoryController.show(req, res);
});
apiRouter.post('/categories', (req, res) => {
    categoryController.store(req, res);
});
apiRouter.put('/categories/:id', (req, res) => {
    categoryController.update(req, res);
});
apiRouter.delete('/categories/:id', (req, res) => {
    categoryController.destroy(req, res);
});

/* -------------------orders route roles----------------------- */
apiRouter.get('/orders', (req, res) => {
    orderController.index(req, res);
});
apiRouter.get('/orders/:id', (req, res) => {
    orderController.show(req, res);
});
apiRouter.post('/orders', (req, res) => {
    orderController.store(req, res);
});
apiRouter.put('/orders/:id/status', (req, res) => {
    orderController.updateStatus(req, res);
});
apiRouter.get('/orders/status/:status', (req, res) => {
    orderController.getOrdersByStatus(req, res);
});
apiRouter.get('/orders/date-range', (req, res) => {
    orderController.getOrdersByDateRange(req, res);
});
apiRouter.delete('/orders/:id', (req, res) => {
    orderController.destroy(req, res);
});

/* -------------------users route roles----------------------- */
apiRouter.get('/users', (req, res) => {
    userController.getAllUsers(req, res);
});
apiRouter.get('/users/:id', (req, res) => {
    userController.getUserById(req, res);
});
apiRouter.put('/users/:id/status', (req, res) => {
    userController.updateUserStatus(req, res);
});
apiRouter.put('/users/:id/password', (req, res) => {
    userController.changePassword(req, res);
});

/* -------------------reports route roles----------------------- */
apiRouter.get('/reports/products/category/:categoryId', (req, res) => {
    reportController.getProductsByCategory(req, res);
});
apiRouter.get('/reports/orders/status/:status', (req, res) => {
    reportController.getOrdersByStatus(req, res);
});
apiRouter.get('/reports/orders/date-range', (req, res) => {
    reportController.getOrdersByDateRange(req, res);
});
apiRouter.get('/reports/orders/status/:status/date-range', (req, res) => {
    reportController.getOrdersByStatusAndDate(req, res);
});

module.exports = apiRouter;