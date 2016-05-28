app.controller('MainCtrl', [
    '$scope', '$rootScope', '$interval', '$timeout', 'ORapi',
    function($scope, $rootScope, $interval, $timeout, ORapi) {


      $scope.options = {
                  chart: {
                      type: 'scatterChart',
                      height: 450,
                      color: d3.scale.category10().range(),
                      scatter: {
                          onlyCircles: false
                      },
                      showDistX: true,
                      showDistY: true,
                    //tooltipContent: function(d) {
                    //    return d.series && '<h3>' + d.series[0].key + '</h3>';
                    //},
                      duration: 350,
                      xAxis: {
                          axisLabel: 'Time',
                          tickFormat: function(d){
                              return d3.time.format('%m/%d/%y')(new Date(d));
                          }
                      },
                      yAxis: {
                          axisLabel: 'Price',
                          tickFormat: function(d){
                              return d3.format('.08f')(d);
                          },
                          axisLabelDistance: -5
                      },
                      zoom: {
                          //NOTE: All attributes below are optional
                          enabled: true,
                          scaleExtent: [1, 10],
                          useFixedDomain: false,
                          useNiceScale: false,
                          horizontalOff: false,
                          verticalOff: false,
                          unzoomEventType: 'dblclick.zoom'
                      }
                  }
              };

              /* Random Data Generator (took from nvd3.org) */
              $scope.history = function() {
                ORapi.Data.getHistory().then(function(response) {
                    $scope.btData = response.data;
                    $scope.data = processData();
                });
              };

              function processData() {
                   var data = [],
                       shapes = ['triangle-up', 'triangle-down'];
                      //  random = d3.random.normal();
                  data.push({
                      key: 'Buy',
                      values: []
                  },{
                      key: 'Sell',
                      values: []
                  });

                   for (var j = 0; j < $scope.btData.length; j++) {
                    if ($scope.btData[j].type == 'buy' && $scope.btData[j].rate !== 'NaN') {
                      data[0].values.push({
                          x: +new Date($scope.btData[j].date)
                          , y: Number($scope.btData[j].rate)
                          , size: $scope.btData[j].amount/10000
                          , shape: shapes[0]
                      });
                    } else if ($scope.btData[j].type == 'sell' && $scope.btData[j].rate !== 'NaN') {
                      data[1].values.push({
                          x: +new Date($scope.btData[j].date)
                          , y: Number($scope.btData[j].rate)
                          , size: $scope.btData[j].amount/100000
                          , shape: shapes[1]
                      });
                    }

                   }

                   return data;
               }

             $scope.history();

  }
]);
