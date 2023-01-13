var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/students1");
var Student = mongoose.model(
  "Student1",
  mongoose.Schema({
    usn: String,
    name: String,
    sex: String,
    dept: String,
    semester: String,
    college: String,
    contact: String,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"));
app.get("/api/students", function (req, res) {
  Student.find(function (err, students) {
    if (err) res.send(err);
    res.json(students);
  });
});
app.get("/api/students/:id", function (req, res) {
  Student.findOne({ _id: req.params.id }, function (err, student) {
    if (err) res.send(err);
    res.json(student);
  });
});
app.post("/api/students", function (req, res) {
  Student.create(req.body, function (err, student) {
    if (err) res.send(err);
    res.json(student);
  });
});
app.delete("/api/students/:id", function (req, res) {
  Student.findOneAndRemove({ _id: req.params.id }, function (err, student) {
    if (err) res.send(err);
    res.json(student);
  });
});
app.put("/api/students/:id", function (req, res) {
  var query = {
    usn: req.body.usn,
    name: req.body.name,
    sex: req.body.sex,
    dept: req.body.dept,
    semester: req.body.semester,
    college: req.body.college,
    contact: req.body.contact,
  };
  Student.findOneAndUpdate(
    { _id: req.params.id },
    query,
    function (err, student) {
      if (err) res.send(err);
      res.json(student);
    }
  );
});
app.listen(3000, function () {
  console.log("server is running on port 3000..");
});
