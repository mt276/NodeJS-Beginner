const getHomepage = (req, res) => {
    res.send(`Hello controller`)
}

const getABC = (req, res) => {
    res.send(`Check ABC`)
}

const getSample = (req, res) => {
    res.render(`sample.ejs`)
}

module.exports = {
    getHomepage,
    getABC,
    getSample
}