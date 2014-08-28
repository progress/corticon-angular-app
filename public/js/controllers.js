function HomeCtrl($scope, $http) {
    $scope.error = '';
    var interval = setInterval(update, 200);
    function update () {
    $http.get('/api/counter').
    success(function(data, status, headers, config) {
        $scope.counter = data.count;
    });
    }
    $scope.form = {};
    $scope.reset = function() {
        if(Object.keys($scope.form).length < 1) {
            $scope.error = 'Invalid input';
            return;
        }
        console.log($scope.form);
        $http.post('/api/reset/', $scope.form).
        success(function(data) {
            $scope.form = {};
            $scope.error = '';
            update();
        });
    };
}