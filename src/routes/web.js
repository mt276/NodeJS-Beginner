const express = require('express');
const { getHomepage, getCreatePage, getSample, postCreateUser, postUpdateUser, deleteUserForId, getUpdatePage } = require(`../controllers/homeController`)
const router = express.Router();

//khai báo route
router.get(`/`, getHomepage);

router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);
router.get('/update', (req, res) => {
    res.render('error.ejs', { message: "Bạn cần chọn một người dùng để cập nhật." });
});


//view động
router.get('/sample', getSample);

router.post('/create-user', postCreateUser)

router.post('/update-user', postUpdateUser);

router.delete('/delete-user', deleteUserForId);


module.exports = router;