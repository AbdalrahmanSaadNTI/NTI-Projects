const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

/* ------------- public folder ---------------- */
app.use(express.static(__dirname + '/public'));
/* ------------- view engine ------------------ */
app.set('view engine', 'ejs');
/* -------------- using form data -------------- */
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* ------------- auth middleware -------------- */
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const { verifyToken } = require('./middleware/authMiddleware');
app.use(verifyToken);

/* ------------- router ----------------------- */
const webRouter = require('./route/web');
const apiRouter = require('./route/api');
app.use(webRouter);
app.use("/api/v1.0", apiRouter);


/* ---------------- start server --------------- */
port = process.env.PORT;
app.listen(port, () => {
    //
    console.log("server start at port " + port);
});