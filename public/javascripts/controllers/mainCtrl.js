app.controller('MainCtrl', [
    '$scope', '$rootScope', '$interval', '$timeout',
    function($scope, $rootScope, $interval, $timeout) {


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
                          axisLabel: 'Price',
                          tickFormat: function(d){
                              return d3.format('.02f')(d);
                          }
                      },
                      yAxis: {
                          axisLabel: 'Time',
                          tickFormat: function(d){
                              return d3.format('.02f')(d);
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

              $scope.data = generateData(4,40);


}];
