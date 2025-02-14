//import express from `express`; //es modules
const express = require(`express`); //node.js
const path = require(`path`); //commonjs
require(`dotenv`).config(); //dotenv

const app = express();//app express
const port = process.env.PORT || 8081; //port => hardcode 
// các môi trường: .dev .uat .production 
const hostname = process.env.HOST_NAME;

//config teamplate engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//config static files
app.use(express.static(path.join(__dirname, 'public')));
//khai báo route
app.get('/', (req, res) => {
    res.send('Hello world 2')
})

app.get('/abc', (req, res) => {
    res.send('Check ABC')
})

//view động
app.get('/sample', (req, res) => {
    res.render('sample.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})