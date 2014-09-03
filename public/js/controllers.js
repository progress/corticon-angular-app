'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, socket) {
    // Clears everything when the page is refreshed
    $scope.form = {};
    var counter = 0;
    $scope.counter = 0;

    // This increments the counter every second.
    var interval = setInterval(update, 1000);
    function update() {
        $scope.$apply(increment());
    }
    function increment() {
        counter++;
        $scope.myStyle = {
            'color': '#' + Math.floor(Math.random() * 16777215).toString(16)
        };
        $scope.counter = counter * counter;
    }
    socket.on('send:updateCount', function(data) {
        counter = data.count;
        $scope.myStyle = {
            'color': '#' + Math.floor(Math.random() * 16777215).toString(16)
        };
        $scope.counter = counter * counter;
        $scope.form = {};
    });
    // This updates the counter if the user enters in a new number.
    $scope.reset = function() {
        // If the input is invalid, nothing is done
        if (Object.keys($scope.form).length < 1) {
            $scope.error = 'Invalid input';
            return;
        }
        counter = $scope.form.newCount;
        $scope.form = {};
        socket.emit('send:reset', {
            count: counter
        });
    };
});