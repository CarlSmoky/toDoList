import express from 'express';
import bodyParser from "body-parser";
import {getDay, getDate} from './date.js';
// import getDay from './date.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", (req, res) => {
  console.log("Here",typeof(getDay));
  const day = getDay();
  res.render('list', { listTitle: day, itemList: items});
});

app.post("/", (req, res) => {
  console.log(req.body);
  const newItem = req.body.newItem;
  if (req.body.list === "Work") {
    workItems = [...workItems, newItem];
    res.redirect("/work");
  } else {
    items = [...items, newItem];
    res.redirect("/");
  }
  
});

app.get("/work", (req, res) => {
  res.render('list', { listTitle: "Work List", itemList: workItems});
} )

app.post("/work", (req, res) => {
  const item = req.body.newItem;
  res.redirect("/work");
})



app.listen(3001, (req, res) => {
  console.log("I'm listening 3001");
})
