/**
 * @ngdoc
 *
 *
 *  /metrics/find?query=*
 *
 */
ngGraphiteServices
  .factory('GraphiteService', ['$q', function ($q) {
    'use strict';


    /**
     * @ngdoc method
     * @name GraphiteService#getAllMetricNamesBulk
     *
     * @description
     * Queries Graphite instance at ``/metrics/index.json`` and returns all of the metrics that
     * a configured Graphite instance exposes.
     *
     * This method can cause performance issues for the Graphite instance.
     * ``index.json`` returns all of the metrics with one request.
     *
     */
    var getAllMetricNamesBulk = function(){


    };

    /**
     * @ngdoc method
     * @name GraphiteService#findAllMetrics
     *
     * @description
     * Queries Graphite instance at the root node, and finds all of the metrics that a
     * the configured Graphite instance exposes.
     *
     */
    var findAllMetricNames = function(){

    };

    /**
     * @ngdoc method
     * @name GraphiteService#findMetricsAt
     * @param node
     *
     * @description
     * Queries Graphite instance and returns all the metrics at the specific node.
     *
     */
    var findMetricsAt = function(node){

    };

    return {
      findAllMetricNames: findAllMetricNames,
      findMetricsAt: findMetricsAt,
      getAllMetricNamesBulk: getAllMetricNamesBulk
    };
  }]);
