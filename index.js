const express = require("express");
const bodyparser = require("body-parser");
//const cors = require("cors");
const cors = require("cors");
const app = express();
app.use(bodyparser.json());
//app.use(cors());
app.use(cors());

const port = process.env.PORT || 5000;

let userDetails=[
  {
    id:1,
    name:"person 1"
  },
  {
    id:2,
    name:"person 2"
  },
  {
    id:3,
    name:"person 3"
  },
  {
    id:4,
    name:"person 4"
  },
  {
    id:5,
    name:"person 5"
  }
];
app.listen(port, () => {
  console.log(`server is listening ${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>simple GET and Post request app..!</h1>")
});

app.get("/users", (req, res) => {
  res.json(userDetails);
});

app.post("/users", (req, res) => {
  userDetails.push(req.body);
  res.json({ message: "user created successfully!" })
});


app.put("/users/:id", (req, res) => {
  console.log(req.params.id);
  userDetails.forEach((element) => {
    if (element.id == req.params.id) {
      element.name = req.body.name;
      res.status(200).send({ message: "updated" });
    }
    else{
      res.send({message:"invalid id"});
    }
  });
});

app.delete("/users/:id", (req, res) => {
  let filterval = userDetails.filter((element) => {
    if (element.id == req.params.id) {
      return element;
    }
  })[0];

  userDetails = filterval;
  res.send(userDetails);
});
