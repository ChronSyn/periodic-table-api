const cors = require("cors");
const express = require("express");
const app = express();
const data = require("./data");

app.use(cors());

app.get("/", (req, res) => {
  res.send(data);
});

app.get("/element", (req, res) => {
  if (req.query.atomicNumber != undefined || req.query.z != undefined) {
    if (req.query.atomicNumber == "" || req.query.z == "") return res.send("No atomic number given");
    var element = data.find(e => e.atomicNumber === parseInt(req.query.atomicNumber || req.query.z));
    if (!element) res.status(404).send(`No element with Z = ${req.query.atomicNumber || req.query.z} found`);
    res.send(element);
  } else if (req.query.symbol != undefined) {
    if (req.query.symbol == "") return res.send("No symbol given");
    var search = req.query.symbol.charAt(0).toUpperCase() + req.query.symbol.slice(1).toLowerCase();
    var element = data.find(e => e.symbol === search);
    if (!element) res.status(404).send(`No element with symbol "${search}" found`);
    res.send(element);
  } else if (req.query.name != undefined) {
    if (req.query.name == "") return res.send("No name given");
    var search = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1).toLowerCase();
    var element = data.find(e => e.name === search);
    if (!element) res.status(404).send(`No element with name "${search}" found`);
    res.send(element);
  } else {
    res.send("Invalid query");
  }
});

app.get("/group", (req, res) => {
  if (req.query.g != undefined) {
    if (req.query.g.toLowerCase() == "alkali" || req.query.g.toLowerCase() == "alkaline earth" || req.query.g.toLowerCase() == "noble gas" || req.query.g.toLowerCase() == "metalloid" || req.query.g.toLowerCase() == "nonmetal" || req.query.g.toLowerCase() == "halogen" || req.query.g.toLowerCase() == "transition metal" || req.query.g.toLowerCase() == "post-transition metal" || req.query.g.toLowerCase() == "lanthanide" || req.query.g.toLowerCase() == "actinide") {
      var elements = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].group == req.query.g.toLowerCase()) elements.push(data[i]);
      }
      res.send(elements);
    } else if (req.query.g == "") {
      res.send("No group given");
    } else {
      res.send(`No group with name "${req.query.g.charAt(0).toUpperCase() + req.query.g.slice(1).toLowerCase()}" found`);
    }
  } else {
    res.send("Invalid query");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})
