const path = require("path");

const express = require("express");
// const expressHbs = require("express-handlebars");

const app = express();

//* Settings

// app.engine(
//   "hbs",
//   expressHbs({
//     extname: "hbs",
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//   })
// ); // to register new template engine in case it's not built-in

// app.set("view engine", "pug"); // [ ejs, pug, express-handlebars ]
// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", "views"); // default = views

//* Routes
const adminData = require("./routes/admin"); // { routes, products }
const shopRoutes = require("./routes/shop");

//* Utils
// app.use(express.json()); //{ limit: '50mb' }
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//* Navigations
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// 404 : Page not found
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

  res.status(404).render("404", { pageTitle: "Page Not Found", path: null }); // path is for ejs 404 page
});

//* Port
app.listen(3000);

// Note =========================================

//* Node Core Modules

// http     : Launch a server, send request
// https    : Launch a SSL server
// fs       :
// path
// os

//* Modules
// const http = require("http");
// const routes = require("./routes");

// const server = http.createServer(app); // routes > app
// server.listen(3000);

//Templating Engines =========================================

/* npm install --save [ejs || pug || express-handlebars]
 * 1. EJS
 *    <p> <%= name %> </p>
 *      Use normal HTMLand plain JavaScript in your templates
 *
 * 2. Pug (Jade)
 *    p #{ name }
 *      Use minimal HTML and custom template language
 *
 * 3. Handlebars
 *    <p> {{ name }} </p>
 *      Use normal HTMLand custom template language
 */
