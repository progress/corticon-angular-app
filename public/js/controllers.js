// This is an app that displays a counter squared. To do so, it sends the counter to the backend that returns the number to display. 
function HomeCtrl($scope, $http) {
    // Clears everything when the page is refreshed
    $scope.form = {};
    var counter = 0;
    $scope.counter = 0;

    // This increments the counter every second.
    var interval = setInterval(increment, 1000);

    function increment() {
        counter++;
        squareNumber();
    }

    // This updates the counter if the user enters in a new number.
    $scope.reset = function() {
        // If the input is invalid, nothing is done
        if (Object.keys($scope.form).length < 1) {
            $scope.error = 'Invalid input';
            return;
        }
        counter = $scope.form.newCount;
        $scope.form = {};
        squareNumber();
    };

    // This calls the api, using a JSON format similar to calling Corticon. 
    function squareNumber() {
        var jsonRequest = JSON.stringify({
            "Objects": [{
                "count": counter
            }]
        });
        $http.post('/api/reset/', jsonRequest).
        success(function(data) {
            // Changes the value displayed as well as its color when it gets data from the backend.
            $scope.myStyle = {
                'color': '#' + Math.floor(Math.random() * 16777215).toString(16)
            };
            console.log(data);
            $scope.counter = data.squared;
            $scope.error = '';
        });
    }
}