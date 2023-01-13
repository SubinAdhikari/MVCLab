var express = require("express");
var MongoClient = require("mongodb").MongoClient;

var app = express();
var PORT = 3000;
var dbName = "student";
var mongoUrl = "mongodb://localhost:27017/student";
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
  if (!err) {
    app.listen(PORT, function () {
      console.log(`Server is running on port no ${PORT}`);
    });

    app.get("/", function (req, res) {
      res.send({
        ok: true,
        message: "Server is running",
      });
    });

    app.get("/lab1.html", function (req, res) {
      res.sendFile(__dirname + "/lab1.html");
    });

    app.post("/student_get", function (req, res) {
      var dbo = db.db(dbName);
      if (!dbo.collection("student")) {
        dbo.createCollection("student", function (err, res) {
          if (err) throw err;
        });
      }

      const myObj = {
        usn: req.body.usn,
        name: req.body.name,
        college: req.body.college,
        sem: req.body.sem,
      };

      dbo.collection("student").insertOne(myObj, function (err, res) {
        if (err) throw err;
      });

      res.send(
        `<p>USN: ${req.body.usn}</p><p>Name: ${req.body.name}</p><p>College: ${req.body.college}</p><p>Sem: ${req.body.sem}</p>`
      );
    });
  }
});
