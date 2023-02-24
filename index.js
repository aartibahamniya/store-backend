const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pass@123",
  database: "store",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/categories", function (req, res) {
  let arr = ["phone", "dslr", "man", "woman"];
  res.send(arr);
});

app.get("/product", function (req, res) {
  db.query("select * from product;", (err, result) => {
    if (err) res.send("not data");
    else res.send(result);
  });
});

// CREATE TABLE product (
//   id int auto_increment,
//   title varchar(255) not null,
//   category varchar(255),
//   image_url varchar(255),
//   description varchar(255),
//   price varchar(255),
//   primary key (id)
// );

app.get("/product-add", function (req, res) {
  console.log("callll", res.data);
  res.send("recived data")
  // db.query("insert into product (title,category,image_url,description,price) values ('Mens Cotton Jacket','cloth','https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=','description','$55.99')", (err, result) => {
  // if(err) console.log(err)
  // else res.send("Insert Done")
  // });
});

app.get("/family", function (req, res) {
  let arr = ["Dharambir", "Geeta", "Aarti", "Anjali", "Sumit", "Ankit"];
  res.send(arr);
});

app.listen(5000, () => {
  console.log("running backend at 5000 port");
});
