app.factory('ORapi', ['$http', '$window', function($http, $window) {

    var url = "http://localhost:3000/";

    var ORapi = ORapi || {};

    ORapi = {};

    ORapi.Data = {
        //*params LIST: 'first_name', 'last_name', 'dob', 'cell', 'addr_street', 'addr_city', 'addr_state', 'addr_zip'//

        getHistory: function(data) {
            return $http({
                method: "GET",
                url: url + "history",
                dataType: "application/json",
                data: data
            });
        },

    }

    return ORapi;

}]);
