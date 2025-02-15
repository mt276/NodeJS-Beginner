const connection = require("../config/database")

const getAllUsers = async () => {
    let [results, fields] = await connection.query('select * from Users u');
    return results;
}

const createUser = async (name, email, city) => {
    let [results, fields] = await connection.query(`INSERT INTO Users (email,name,city) VALUES (?,?,?)`, [name, email, city]);
    return results;
}

const updateUser = async (id, name, email, city) => {
    let [results, fields] = await connection.query(`UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?`, [name, email, city, id]);
    return results;
}

const deleteUser = async (id) => {
    let [results, fields] = await connection.query(`DELETE FROM Users WHERE id=?`, [id]);
    return results;
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}