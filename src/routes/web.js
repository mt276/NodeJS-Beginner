const express = require('express');
const { getHomepage, getCreatePage, getSample, postCreateUser, putUpdateUser, deleteUserForId } = require(`../controllers/homeController`)
const router = express.Router();

//khai báo route
router.get(`/`, getHomepage);

router.get('/create', getCreatePage);

//view động
router.get('/sample', getSample);

router.post('/create-user', postCreateUser)

module.exports = router;