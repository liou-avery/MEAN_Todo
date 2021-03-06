var todoApp = angular.module('todoApp', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/todos')
    .success(function(data) { //on success
        $scope.todos = data;  //set todos data to what was gotten from db
        console.log(data);
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
      };

      $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
      };
}
