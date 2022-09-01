import express from 'express';
import bodyParser from "body-parser";
import { getDay, getDate } from './date.js';
import mongoose from 'mongoose';
// import getDay from './date.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemsSchema = {
  name: String
}

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  name: "somethinng"
})

const item2 = new Item({
  name: "something2"
})

const item3 = new Item({
  name: "something3"
})

const defaultItems = [item1, item2, item3];

let workItems = [];

app.get("/", (req, res) => {
  Item.find({}, (err, allItems) => {
    if (allItems.length === 0) {
      Item.insertMany(defaultItems, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully insert default items");
          res.redirect("/");
        }
      })
    } else {
      console.log("allItems:", allItems);
      res.render('list', { listTitle: "Today", itemList: allItems });
    }
  });
});

app.post("/", (req, res) => {
  const newItem = req.body.newItem;
  const item = new Item ({
    name: newItem
  })
  item.save();
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render('list', { listTitle: "Work List", itemList: workItems });
})

app.post("/work", (req, res) => {
  const item = req.body.newItem;
  res.redirect("/work");
})



app.listen(3001, (req, res) => {
  console.log("I'm listening 3001");
})
