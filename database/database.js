const Sequelize = require("sequelize");

const connection = new Sequelize("meublog", "root", "info1325", {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
})

module.exports = connection;