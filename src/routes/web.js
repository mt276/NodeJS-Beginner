const express = require('express');
const { getHomepage, getABC, getSample } = require(`../controllers/homeController`)
const router = express.Router();

//khai báo route
router.get(`/`, getHomepage);

router.get('/abc', getABC);

//view động
router.get('/sample', getSample);

module.exports = router;