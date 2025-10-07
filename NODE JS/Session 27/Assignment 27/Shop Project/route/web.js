const express = require('express');
const webRouter = express.Router();
const app = express();

/* ------------- middleware ------------------- */
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

/* ------------- controllers ------------------- */

const productController = require('../controllers/productController');
const authWebController = require('../controllers/authWebController');
const categoryController = require('../controllers/categoryController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const reportController = require('../controllers/reportController');

/* -------------- parse of form ------------------- */
webRouter.use(express.json());
webRouter.use(express.urlencoded({
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

/* -------------------dashboard route----------------------- */
webRouter.get('/', (req, res) => {
    res.render('pages/dashboard', { 
        pageTitle: 'Dashboard', 
        user: req.user 
    });
});

/* -------------------products route roles----------------------- */
webRouter.get('/products', requireAuth, (req, res) => {
    productController.index(req, res);
});
webRouter.get('/products/show/:id', requireAuth, (req, res) => {
    productController.show(req, res);
});
webRouter.get('/products/createForm', requireAuth, (req, res) => {
    productController.createForm(req, res);
});

/* ---****---- */
webRouter.post('/products/store', requireAuth, upload.single('photo'), (req, res) => {
    productController.store(req, res);
});

webRouter.get('/products/updateForm/:id', requireAuth, (req, res) => {
    productController.updateForm(req, res);
});
webRouter.post('/products/update', requireAuth, upload.single('photo'), (req, res) => {
    productController.update(req, res);
});
webRouter.get('/products/destroy/:id', requireAuth, (req, res) => {
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

webRouter.get('/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/signin');
});

/* -------------------categories web routes----------------------- */
webRouter.get('/categories', requireAuth, (req, res) => {
    // Fetch categories and render view
    const categoryModel = require('../models/categoryModel');
    categoryModel.index()
        .then(categories => {
            res.render('pages/categories/index', { 
                categories, 
                user: req.user,
                pageTitle: 'Categories'
            });
        })
        .catch(error => {
            res.render('pages/categories/index', { 
                categories: [], 
                user: req.user,
                pageTitle: 'Categories',
                error: 'Failed to load categories'
            });
        });
});

webRouter.get('/categories/create', requireAuth, (req, res) => {
    res.render('pages/categories/create', { 
        user: req.user,
        pageTitle: 'Create Category'
    });
});

webRouter.post('/categories', requireAuth, (req, res) => {
    categoryController.store(req, res);
});

webRouter.get('/categories/:id', requireAuth, (req, res) => {
    categoryController.show(req, res);
});

const categoryModel = require('../models/categoryModel'); // Make sure this is at the top

webRouter.get('/categories/:id/edit', requireAuth, async (req, res) => {
    const id = req.params.id;
    try {
        const categoryArr = await categoryModel.show(id); // Fetch category from DB
        if (!categoryArr || categoryArr.length === 0) {
            return res.status(404).send('Category not found');
        }
        res.render('pages/categories/edit', { 
            user: req.user,
            pageTitle: 'Edit Category',
            categoryData: categoryArr[0] // Pass the full category object
        });
    } catch (err) {
        res.status(500).send('Error loading category');
    }
});

webRouter.put('/categories/:id', requireAuth, (req, res) => {
    categoryController.update(req, res);
});

webRouter.delete('/categories/:id', requireAuth, (req, res) => {
    categoryController.destroy(req, res);
});

/* -------------------orders web routes----------------------- */
webRouter.get('/orders', requireAuth, (req, res) => {
    // Fetch orders and render view
    const orderModel = require('../models/orderModel');
    orderModel.index()
        .then(orders => {
            res.render('pages/orders/index', { 
                orders, 
                user: req.user,
                pageTitle: 'Orders',
                req: req
            });
        })
        .catch(error => {
            res.render('pages/orders/index', { 
                orders: [], 
                user: req.user,
                pageTitle: 'Orders',
                req: req,
                error: 'Failed to load orders'
            });
        });
});

webRouter.get('/orders/create', requireAuth, (req, res) => {
    res.render('pages/orders/create', { 
        user: req.user,
        pageTitle: 'Create Order'
    });
});

webRouter.post('/orders', requireAuth, (req, res) => {
    orderController.store(req, res);
});

webRouter.get('/orders/:id', requireAuth, (req, res) => {
    orderController.show(req, res);
});

webRouter.put('/orders/:id/status', requireAuth, (req, res) => {
    orderController.updateStatus(req, res);
});

webRouter.get('/orders/status/:status', requireAuth, (req, res) => {
    orderController.getOrdersByStatus(req, res);
});

webRouter.get('/orders/date-range', requireAuth, (req, res) => {
    orderController.getOrdersByDateRange(req, res);
});

webRouter.delete('/orders/:id', requireAuth, (req, res) => {
    orderController.destroy(req, res);
});

/* -------------------users web routes----------------------- */
webRouter.get('/users', requireRole(['admin', 'shop_owner']), (req, res) => {
    // Fetch users and render view
    const authModel = require('../models/authModel');
    authModel.getAllUsers()
        .then(users => {
            res.render('pages/users/index', { 
                users, 
                user: req.user,
                pageTitle: 'Users Management'
            });
        })
        .catch(error => {
            res.render('pages/users/index', { 
                users: [], 
                user: req.user,
                pageTitle: 'Users Management',
                error: 'Failed to load users'
            });
        });
});

webRouter.get('/users/create', requireRole(['admin', 'shop_owner']), (req, res) => {
    res.render('pages/users/create', { 
        user: req.user,
        pageTitle: 'Create User'
    });
});

webRouter.post('/users', requireRole(['admin', 'shop_owner']), (req, res) => {
    userController.getAllUsers(req, res);
});

webRouter.get('/users/:id', requireRole(['admin', 'shop_owner']), (req, res) => {
    userController.getUserById(req, res);
});

webRouter.put('/users/:id/status', requireRole(['admin', 'shop_owner']), (req, res) => {
    userController.updateUserStatus(req, res);
});

webRouter.put('/users/:id/password', requireRole(['admin', 'shop_owner']), (req, res) => {
    userController.changePassword(req, res);
});

/* -------------------reports web routes----------------------- */

webRouter.get('/reports', requireRole(['admin', 'shop_owner']), (req, res) => {
    res.render('pages/reports/index', { 
        user: req.user,
        pageTitle: 'Reports'
    });
});

webRouter.get('/reports/products', requireRole(['admin', 'shop_owner']), (req, res) => {
    res.render('pages/reports/products', { 
        user: req.user,
        pageTitle: 'Product Reports'
    });
});

webRouter.get('/reports/orders', requireRole(['admin', 'shop_owner']), (req, res) => {
    res.render('pages/reports/orders', { 
        user: req.user,
        pageTitle: 'Order Reports'
    });
});

webRouter.get('/reports/products/category/:categoryId', requireRole(['admin', 'shop_owner']), (req, res) => {
    reportController.getProductsByCategory(req, res);
});

webRouter.get('/reports/orders/status/:status', requireRole(['admin', 'shop_owner']), (req, res) => {
    reportController.getOrdersByStatus(req, res);
});

webRouter.get('/reports/orders/date-range', requireRole(['admin', 'shop_owner']), (req, res) => {
    reportController.getOrdersByDateRange(req, res);
});

webRouter.get('/reports/orders/status/:status/date-range', requireRole(['admin', 'shop_owner']), (req, res) => {
    reportController.getOrdersByStatusAndDate(req, res);
});

module.exports = webRouter;