const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'upload')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
  }
})

const upload = multer({ storage: storage });

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

app.get("/products", function (req, res) {
  db.query("select * from product;", (err, result) => {
    if (err) res.send("not data");
    else res.send(result);
  });
});

app.post("/signup", function (req, res) {
  db.query(
    `insert into users (name,email,password) values ('${req.body.name}','${req.body.email}','${req.body.password}')`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.send({ msg: "Error!" });
      } else {
        res.send({ msg: "Add successfully!" });
      }
    }
  );
});

app.post("/product-add", upload.single("image_url"), function (req, res) {
  try {
    let query = `insert into product (title,category,image_url,description,price) 
    values ('${req.body.title}','${req.body.category}','${req.file.filename}','${req.body.description}','${req.body.price}')`;

    db.query(query, (err, result) => {
      if (err) console.log(err);
      else res.send({ msg: "Add Successfully!", status: 200 });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/family", function (req, res) {
  let arr = ["Dharambir", "Geeta", "Aarti", "Anjali", "Sumit", "Ankit"];
  res.send(arr);
});

app.listen(5000, () => {
  console.log("running backend at 5000 port");
});
