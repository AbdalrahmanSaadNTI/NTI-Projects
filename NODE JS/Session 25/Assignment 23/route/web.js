const express = require('express');
const webRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

const productController = require('../controllers/productController');
const authWebController = require('../controllers/authWebController');

/* -------------- parse of form ------------------- */
webRouter.use(express.json());
webRouter.use(express.urlencoded({
    extended: true
}));

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/uploades/");
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

/* -------------------products route roles----------------------- */
webRouter.get('/products', (req, res) => {
    productController.index(req, res);
});
webRouter.get('/products/show/:id', (req, res) => {
    productController.show(req, res);
});
webRouter.get('/products/createForm', (req, res) => {
    productController.createForm(req, res);
});

/* ---****---- */
webRouter.post('/products/store', upload.single('photo'), (req, res) => {
    productController.store(req, res);
});

webRouter.get('/products/updateForm/:id', (req, res) => {
    productController.updateForm(req, res);
});
webRouter.post('/products/update', upload.single('photo'), (req, res) => {
    productController.update(req, res);
});
webRouter.get('/products/destroy/:id', (req, res) => {
    productController.destroy(req, res);
});
// add more route roles

/* -------------------auth web routes----------------------- */
webRouter.get('/auth/signin', (req, res) => {
    authWebController.renderSignin(req, res);
});
webRouter.get('/auth/signup', (req, res) => {
    authWebController.renderSignup(req, res);
});
webRouter.post('/auth/signin', (req, res) => {
    authWebController.postSignin(req, res);
});
webRouter.post('/auth/signup', (req, res) => {
    authWebController.postSignup(req, res);
});


module.exports = webRouter;