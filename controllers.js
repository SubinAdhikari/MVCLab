myApp.controller(
  "stdController",
  function ($scope, $route, $routeParams, $http) {
    $scope.getStudents = function () {
      $http.get("/api/students/").then(function (response) {
        $scope.students = response.data;
      });
    };

    $scope.showStudent = function () {
      var id = $routeParams.id;
      $http.get("/api/students/" + id).then(function (response) {
        $scope.student = response.data;
      });
    };

    $scope.addStudent = function () {
      //var id = $routeParams.id;
      $http.post("/api/students/", $scope.student).then(function (response) {
        //$scope.employee = response.data;
        window.location.href = "/";
      });
    };

    $scope.updateStudent = function () {
      var id = $routeParams.id;
      $http
        .put("/api/students/" + id, $scope.student)
        .then(function (response) {
          //$scope.employee = response.data;
          window.location.href = "/";
        });
    };

    $scope.deleteStudent = function (id) {
      var id = id;
      $http.delete("/api/students/" + id).then(function (response) {
        $route.reload();
      });
    };
  }
);
