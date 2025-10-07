const express = require('express');
const dashboardRouter = express.Router();
const app = express();

/* ----------- controllers -------------------- */

const authController = require("../controllers/dashboard/authController");

/* -------------- not auth pages ------------------- */
dashboardRouter.get('/signup', (req, res) => {
    authController.signup(req, res);
});

dashboardRouter.post('/storeUser', (req, res) => {
    authController.storeUser(req, res);
});

dashboardRouter.get('/signin', (req, res) => {
    authController.signin(req, res);
});

dashboardRouter.post('/verifySignin', (req, res) => {
    authController.verifySignin(req, res);
});

dashboardRouter.get('/logout', (req, res) => {
    authController.logout(req, res);
});

/* ------- auth --------- */
dashboardRouter.use(authController.isAuth);


/* ********** dashboard ************* */
dashboardRouter.get('/dashboard/index', (req, res) => {
    res.render("../views/dashboard/index.ejs");
});





module.exports = dashboardRouter;