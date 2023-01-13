var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "templates/list.html",
      controller: "stdController",
    })
    .when("/students", {
      templateUrl: "templates/list.html",
      controller: "stdController",
    })
    .when("/students/create", {
      templateUrl: "templates/add.html",
      controller: "stdController",
    })
    .when("/students/:id/edit", {
      templateUrl: "templates/edit.html",
      controller: "stdController",
    })
    .when("/students/:id/show", {
      templateUrl: "templates/show.html",
      controller: "stdController",
    });
});
