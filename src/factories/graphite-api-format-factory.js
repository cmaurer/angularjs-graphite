/**
 * @ngdoc service
 * @name ngGraphite.factories.GraphiteDataParser
 *
 * @description
 * Formats Graphite Raw Data Format to Graphite Json Format
 *
 * Graphite Raw Format
 * ```html
 * <target name>,<start timestamp>,<end timestamp>,<series step>|[data]*
 * ```
 *
 * Graphite Json Format
 * ```js
 * [{
 * "target": "entries",
 * "datapoints": [
 *   [1.0, 1311836008],
 *   [2.0, 1311836009],
 *   [3.0, 1311836010],
 *   [5.0, 1311836011],
 *   [6.0, 1311836012]
 * ]
 * }]
 * ```
 *
 * Csv Format
 * ```
 * entries,2011-07-28 01:53:28,1.0
 * ```
 *
 */
ngGraphiteFactories
.factory('GraphiteDataParser', function () {
    'use strict';

    return {

      /**
       * @ngdoc function
       * @name ngGraphite.factories.GraphiteDataParser.rawToJson
       * @link https://graphite.readthedocs.org/en/latest/render_api.html#rawdata
       * @link https://graphite.readthedocs.org/en/latest/render_api.html#json
       * @param {String} rawData Graphite Raw Data to parse into Graphite Json Data
       * @returns {Object} Json Object based on the raw data
       *
       * @example
       *
       */
      rawToJson: function(rawData){
        var response = [], splitLine, jsonObj, metaData,
          startTimestamp, endTimestamp, seriesStep;

        rawData.split(/\n/g).forEach(function(rawDataLine){
          if(rawDataLine){
            jsonObj = {'target': '', 'datapoints': []};
            splitLine = rawDataLine.split(/\|/);
            metaData = splitLine[0].split(/\,/);
            jsonObj.target = metaData[0];

            startTimestamp = (+metaData[1]);
            endTimestamp = (+metaData[2]);
            seriesStep = (+metaData[3]);

            splitLine[1].split(/\,/).forEach(function(data){
              jsonObj.datapoints.push([data, startTimestamp]);
              startTimestamp = startTimestamp + seriesStep;
            });
            response.push(jsonObj);
          }
        });
        return response;
      },

      /**
       * @ngdoc function
       * @name ngGraphite.factories.GraphiteDataParser.jsonToRaw
       */
      jsonToRaw: function(jsonData){
        var raw = '';

        return raw;
      }
    };

});

