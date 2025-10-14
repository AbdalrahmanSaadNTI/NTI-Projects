const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const cors = require('cors')();

/* ------------- public folder ---------------- */
app.use(express.static(__dirname + '/public'));
/* ------------- view engine ------------------ */
app.set('view engine', 'ejs');
/* -------------- using form data -------------- */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
/* ------------- router ----------------------- */
app.use(cors);
const webRouter = require('./route/web');
const apiRouter = require('./route/api');
app.use("/api/v1.0", apiRouter);
app.use(webRouter);

/* ---------------- start server --------------- */
port = process.env.PORT;
app.listen(port, () => {
    //
    console.log("server start at port " + port);
});