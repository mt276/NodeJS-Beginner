const connection = require('../config/database')
const { getAllUsers, createUser, updateUser, deleteUser } = require('../services/CRUDSerivice')
const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render(`home.ejs`, { listUsers: results });
}

const getCreatePage = (req, res) => {
    res.render(`create.ejs`)
}

const getSample = (req, res) => {
    res.render(`sample.ejs`)
}

const postCreateUser = async (req, res) => {

    //console.log(`>>>req body: `, req.body);

    let { email, name, city } = req.body;
    let result = await createUser(email, name, city);

    console.log(`>>result`, result);

    res.send(`Create succeed!`)
}

const putUpdateUser = async (req, res) => {

    //console.log(`>>>req body: `, req.body);

    let { email, name, city, id } = req.body;
    let result = await updateUser(email, name, city, id);

    console.log(`>>result`, result);

    res.send(`Update succeed!`)
}

const deleteUserForId = async (req, res) => {

    //console.log(`>>>req body: `, req.body);

    let { id } = req.body;
    let result = await deleteUserUser(id);

    console.log(`>>result`, result);

    res.send(`Delete succeed!`)
}

module.exports = {
    getHomepage,
    getCreatePage,
    getSample,
    postCreateUser,
    putUpdateUser,
    deleteUserForId
}