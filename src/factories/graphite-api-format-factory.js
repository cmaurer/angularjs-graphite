/**
 *     raw format
 *        <target name>,<start timestamp>,<end timestamp>,<series step>|[data]*
 *
 *      json format
 *        [{
              "target": "entries",
              "datapoints": [
                [1.0, 1311836008],
                [2.0, 1311836009],
                [3.0, 1311836010],
                [5.0, 1311836011],
                [6.0, 1311836012]
              ]
            }]
 *
 *    csv format
 *
 *    entries,2011-07-28 01:53:28,1.0
 *
 *
 *
 */

ngGraphiteFactories
.factory('GraphiteDataParser', function () {
'use strict';
    return {
      rawToJson: function(rawData){
        var response = [], splitLine, jsonObj, metaData,
          startTimestamp, endTimestamp, seriesStep;

        //multiple lines
        //split at the |
        //parse <target name>,<start timestamp>,<end timestamp>,<series step>
        //parse [data]
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
      jsonToRaw: function(jsonData){
        var raw = '';

        return raw;
      }
    };

});

