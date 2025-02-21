//import express from `express`; //es modules
require(`dotenv`).config(); //dotenv
const express = require(`express`); //node.js
const path = require(`path`); //commonjs
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const app = express();//app express
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//config teamplate engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})