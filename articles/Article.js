const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles",{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})


Category.hasMany(Article); // relationship 1 to many
Article.belongsTo(Category); // relationship 1 to 1

//Article.sync({force: true}); TABELA JÁ CRIADA 

module.exports = Article; 