const express = require('express');
const apiRouter = express.Router();

/* ------------- controllers ------------------- */

const productApiController = require('../controllers/productApiController');
const authController = require('../controllers/authController');

/* -------------- parse of form ------------------- */
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({
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
// add more route roles


module.exports = apiRouter;