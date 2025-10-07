const express = require('express');
const webRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

const movieController = require('../controllers/movieController');

/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
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

/* -------------------movies route roles----------------------- */
webRouter.get('/movies', (req, res) => {
    movieController.index(req, res);
});
webRouter.get('/movies/show/:id', (req, res) => {
    movieController.show(req, res);
});
webRouter.get('/movies/createForm', (req, res) => {
    movieController.createForm(req, res);
});

/* ---****---- */
webRouter.post('/movies/store', upload.single('thumbnail'), (req, res) => {
    movieController.store(req, res);
});

webRouter.get('/movies/updateForm/:id', (req, res) => {
    movieController.updateForm(req, res);
});
webRouter.post('/movies/update', upload.single('thumbnail'), (req, res) => {
    movieController.update(req, res);
});
webRouter.get('/movies/destroy/:id', (req, res) => {
    movieController.destroy(req, res);
});
// add more route roles


module.exports = webRouter;