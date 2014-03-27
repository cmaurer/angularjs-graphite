/*
 render url parameters
 formatTypes = ['raw', 'json', 'csv', 'png', 'pickle', 'svg'],
 providerOptions = {
 targets:[],
 format: formatTypes[0],
 from: '-24h',
 areaAlpha: null,
 areaMode: null, //none, first, all, stacked
 bgcolor: null,
 cacheTimeout: null,
 colorList: null,
 drawNullAsZero: null,
 fgcolor: null,
 fontBold: null,
 fontItalic: null,
 fontName: null,
 fontSize: null,
 graphOnly: null,
 graphiteType: null, //line, pie
 hideLegend: null,
 hideAxes: null,
 hideYAxis: null,
 hideGrid: null,
 height: null,
 jsonp: null,
 leftColor: null,
 leftDashed: null,
 leftWidth: null,
 lineMode: null, //slope, staircase, connected
 lineWidth: null,
 logBase: null,
 localOnly: null,
 majorGridLineColor: null,
 margin: null,
 max: null,
 maxDataPoints: null,
 minorGridLineColor: null,
 minorY: null,
 min: null,
 minXStep: null,
 noCache: null,
 pieMode: null, //average, maximum, minimum
 rightColor: null,
 rightDashed: null,
 rightWidth: null,
 template: null,
 thickness: null,
 tite: null,
 tz: null, //'America/Los_Angeles', 'UTC'
 uniqueLegend: null,
 until: 'now',
 vtitle: null,
 vtitleRight: null,
 width: null,
 xFormat: null,
 yAxisSide: null,
 yDivisor: null,
 yLimit: null,
 yLimitLeft: null,
 yLimitRight: null,
 yMin: null,
 yMax: null,
 yMaxLeft: null,
 yMaxRight: null,
 yMinLeft: null,
 yMinRight: null,
 yStep: null,
 yStepLeft: null,
 yStepRight: null,
 yUnitSystem: null //si, binary, none
 */

/**
 * @ngdoc provider
 */
ngGraphiteProviders.provider('Graphite', function(){
  'use strict';

  var defaultMethod = 'GET';
  this.setDefaultMethod = function(method){
    defaultMethod = method;
  };

  var defaultProtocol = 'http';
  this.setDefaultProtocol = function(protocol){
    defaultProtocol = protocol;
  };

  var defaultHost = 'localhost';
  this.setDefaultHost = function(host){
    defaultHost = host;
  };

  var defaultPort = 80;
  this.setDefaultPort = function(port){
    defaultPort = port;
  };

  var defaultFormat = 'json';
  this.setDefaultFormat = function(format){
    defaultFormat = format;
  };

  var defaultPath = '/render';
  this.setDefaultPath = function(path){
    defaultPath = path;
  };

  var defaultFrom = '-24h';
  this.setDefaultFrom = function(from){
    defaultFrom = from;
  };

  var defaultUntil = 'now';
  this.setDefaultUntil = function(until){
    defaultUntil = until;
  };

  this.buildUrl = function(path, targets, from, until){
    if(!path){
      path = defaultPath;
    }
    if(!from){
      from = defaultFrom;
    }
    if(!until){
      until = defaultUntil;
    }
    var urlStr = defaultProtocol + '://' +
      defaultHost + ':' +
      defaultPort +
      path +
      '?format=' + defaultFormat +
      '&from=' + from +
      '&until=' + until;
    if(targets){
      targets.forEach(function(target){
        urlStr = urlStr + '&target=' + target;
      });
    }
    return urlStr;

  };

  this.$get = function(){
    return {
      buildUrl: function(path, targets, from, until){
        if(!path){
          path = defaultPath;
        }
        if(!from){
          from = defaultFrom;
        }
        if(!until){
          until = defaultUntil;
        }
        var urlStr = defaultProtocol + '://' +
          defaultHost + ':' +
          defaultPort +
          path +
          '?format=' + defaultFormat +
          '&from=' + from +
          '&until=' + until;
        if(targets){
          targets.forEach(function(target){
            urlStr = urlStr + '&target=' + target;
          });
        }
        return urlStr;
      }
    }
  }
});