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

})
.factory('GraphiteDateParser', function () {
  'use strict';
   var yearsRegex = /(\-)([0-9]*)(y[ear]*?s?)/,
      monthsRegex = /(\-)([0-9]*)(m[onth]*?s?)/,
      daysRegex = /(\-)([0-9]*)(d[ay]*?s?)/,
      hoursRegex = /(\-)([0-9]*)(h[our]*?s?)/,
      minutesRegex = /(\-)([0-9]*)(m[inute]*?s?)/,
      secondsRegex = /(\-)([0-9]*)(s[econd]*?s?)/;

    var parseDate = function(dte){
      if(yearsRegex.test(dte)){
//        return moment().subtract('years', +yearsRegex.exec(dte)[2])
      } else if(monthsRegex.test(dte)){
//        return moment().subtract('months', +monthsRegex.exec(dte)[2])
      } else if(daysRegex.test(dte)){
//        return moment().subtract('days', +daysRegex.exec(dte)[2])
      } else if(hoursRegex.test(dte)){
//        return moment().subtract('hours', +hoursRegex.exec(dte)[2])
      } else if(minutesRegex.test(dte)){
//        return moment().subtract('minutes', +minutesRegex.exec(dte)[2])
      } else if(secondsRegex.test(dte)){
//        return moment().subtract('seconds', +secondsRegex.exec(dte)[2])
      }
    };

    var createDatapoints = function(from, until, step, max, min){
      console.log('createDatapoints', 'step', step, 'max', max, 'min', min);
      var datapoints = [];
      while(from.isBefore(until)){
        datapoints.push([Math.round((Math.random() * (max - min) + min)), from.seconds(step).unix()]);
        from.add('seconds', +step);
      }
      return datapoints;
    };

//    app.get('/render', function(request, response){
//      //from, until, datapoints
//      var resp = [],
//        from = parseQueryDate(request.query.from),
//        until = parseQueryDate(request.query.until),
//        target = request.query.target,
//        cfg = config.filter(function(d){return d.target === target;})[0],
//        min = +cfg.min,
//        max = +cfg.max,
//        step = +cfg.step,
//        datapoints = createDatapoints(from, until, step, max, min);
//      resp.push({target: target, datapoints: datapoints});
//      return response.send(200, resp);
//    });
//
//
    return {
      parseDate: parseDate,
      createDatapoints: createDatapoints
    };
});

