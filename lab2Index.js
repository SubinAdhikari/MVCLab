var express = require("express");
var app = express();

var MongoClient = require("mongodb").MongoClient;
const { body, validationResult } = require("express-validator");
var ejs = require("ejs");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var PORT = 3000;
var mongoUrl = "mongodb://localhost:27017/student";
var mongoDb = "student";

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
  if (!err) {
    app.listen(PORT, function (err, res) {
      if (err) {
        throw err;
      } else {
        console.log(`Server is running on port ${PORT}`);
      }
    });

    app.get("/", function (req, res) {
      res.send({
        ok: true,
        message: `Server is running on port ${PORT}`,
      });
    });

    app.get("/lab2.html", function (req, res) {
      res.sendFile(__dirname + "/lab2.html");
    });

    const validateData = {
      data: [
        body("name").not().isEmpty().withMessage("Name should not be empty"),
        body("usn").not().isEmpty().withMessage("USN should not be empty"),
        body("usn")
          .matches("^1NT21MC[0-9][0-9][0-9]$")
          .withMessage("Invalid USN"),
      ],
    };

    const validateFun = function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        next();
        return;
      } else {
        return res.send(errors);
      }
    };

    app.post(
      "/student_post",
      validateData.data,
      validateFun,
      function (req, res) {
        var dbo = db.db(mongoDb);
        if (!dbo.collection) {
          dbo.createCollection("student", function (err, res) {
            if (err) {
              throw err;
            }
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
      }
    );
  }
});
