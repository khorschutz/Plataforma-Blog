const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database");

// Categories and articles routes
const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');
const usersController = require("./users/usersController");

//Models
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

// view engine
app.set("view engine", "ejs");

//sessions
app.use(session({
    secret: "a1b2c3d4e5f6g7h8i9j10", 
    cookie: {maxAge: 30000000},
    resave: false,
    saveUninitialized: false
}))

// static
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// database
connection
    .authenticate()
    .then(() => {
        console.log("Conectado com sucesso!");
    }).catch((error) => {
        console.log(error);
    })


app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);


app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles =>{
        
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    });
})

app.get("/category/:slug", (req, res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug,
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories =>{
                res.render("index",{articles: category.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})

app.listen(8080, () => {
    console.log("O servidor está em funcionamento!")
})