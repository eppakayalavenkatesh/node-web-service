const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { send } = require("process");
const getDetails = require("./utils/getDetails");
const { query } = require("express");

const app = express();

const publicDir = path.join(__dirname, "../public");

app.use(express.static(publicDir));

// to change dynamic views path to template
const pathToTemplate = path.join(__dirname, "../template/views");
const pathToPartials = path.join(__dirname, "../template/partials");

// for dynamic page  loading
app.set("view engine", "hbs");

// below line is used to change views directory to custom path setup
app.set("views", pathToTemplate);

hbs.registerPartials(pathToPartials);

app.get("", (req, res) => {
  res.render("index", {
    title: "home page",
    author: "venkatesh",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/about/*", (req, res) => {
  res.send("about in details not found");
});

app.get("/products", (req, res) => {
  if (!req.query.id) {
    return res.send({
      error: "Please provide search key",
    });
  }

  getDetails(req.query.id, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({
      user: data,
    });
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    error_code: 404,
    error_msg: "NOT FOUND",
  });
});

// for static page loading

// app.get('' , (req , res) => {
//     res.send('Hellow express')
// })

// app.get('/about' , (req , res) => {
//     res.send({
//         name : "venky" ,
//         age  : 23
//     })
// })

// app.get('/help' , (req , resp) => {
//     resp.send('<h1>Help desk</h1>')
// })

app.listen(3000, () => {
  console.log("express server up run port 3000");
});
