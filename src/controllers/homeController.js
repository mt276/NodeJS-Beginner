const connection = require('../config/database')
const { getAllUsers, createUser, updateUser, deleteUser, getUserById } = require('../services/CRUDSerivice')
const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render(`home.ejs`, { listUsers: results });
}

const getCreatePage = (req, res) => {
    res.render(`create.ejs`)
}

const getSample = async (req, res) => {
    let results = await getAllUsers();
    return res.render(`sample.ejs`, { listUsers: results });
}

const postCreateUser = async (req, res) => {

    //console.log(`>>>req body: `, req.body);

    let { email, name, city } = req.body;
    let result = await createUser(email, name, city);

    console.log(`>>result`, result);

    //return res.status(200).json({ message: "Create successful!" });
    res.redirect('/create');
}

const postUpdateUser = async (req, res) => {
    try {

        let { email, name, city, id } = req.body;
        if (!id || !email || !name || !city) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        let result = await updateUser(email, name, city, id);
        console.log(`>>result`, result);
        //res.redirect('/');
        return res.status(200).json({ message: "Update successful!" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).render('error.ejs', { message: "Server error" });
    }



}

const deleteUserForId = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(400).render('error.ejs', { message: "Missing required fields" });
    }
    let result = await deleteUser(id);

    console.log(`>>result`, result);

    return res.status(200).json({ message: "Delete successful!", user: { id } });
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).render('error.ejs', { message: "Thiếu ID người dùng!" });
    }
    let result = await getUserById(userId);
    let user = result[0] || null;
    if (!user) {
        return res.status(404).render('error.ejs', { message: "Người dùng không tồn tại hoặc đã bị xóa!" });
    }
    res.render(`update.ejs`, { userEdit: user });
}

module.exports = {
    getHomepage,
    getCreatePage,
    getSample,
    postCreateUser,
    postUpdateUser,
    deleteUserForId,
    getUpdatePage
}