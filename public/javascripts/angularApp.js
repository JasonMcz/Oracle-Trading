var app = angular.module('oracle', [
  'nvd3'
  // 'ui.bootstrap'
]);


app.filter('isempty', function() {
    return function(input) {
        return isEmpty(input) ? 'waiting..' : input;
    };

    function isEmpty (i){
        return (i === null || i === undefined || !i);
    }
});
