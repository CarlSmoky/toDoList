import express from 'express';
import bodyParser from "body-parser";
import { getDay, getDate } from './date.js';
import mongoose from 'mongoose';
import _ from 'lodash';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemsSchema = {
  name: String
};

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  name: "Go shopping"
});

const item2 = new Item({
  name: "Buy fruit"
});

const item3 = new Item({
  name: "Eat fruit"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("list", listSchema);


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
      res.render('list', { listTitle: "Today", itemList: allItems });
    }
  });
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, (err, result) => {
    if (!err && !result) {
      // Create new list
      const list = new List({
        name: customListName,
        items: defaultItems
      })
    
      list.save();
      res.redirect(`/${customListName}`)
    } else {
      // Show an existing list
      res.render('list', { listTitle: result.name, itemList: result.items });
    }
  })

  
})

app.post("/", (req, res) => {
  const newItem = req.body.newItem;
  const listName = req.body.list;
  const item = new Item ({
    name: newItem
  })
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, result) => {
      result.items.push(item);
      result.save();
      res.redirect(`/${listName}`)
    })
  }
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, err => {
      if (!err) {
        console.log("Succesfully deleted the item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, result) => {
      if (!err) {
        res.redirect(`/${listName}`);
      }
    })

  };
  
})



app.post("/work", (req, res) => {
  const item = req.body.newItem;
  res.redirect("/work");
})



app.listen(3001, (req, res) => {
  console.log("I'm listening 3001");
})
