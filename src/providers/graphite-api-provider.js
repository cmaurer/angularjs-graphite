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
ngGraphiteProviders.provider('graphite', function(){
  'use strict';

  var httpConfig = {}, options = {};

  this.config = function (cfg) {
    if(cfg){
      if(cfg.baseUrl){
        options.baseUrl = cfg.baseUrl.replace(/\/$/, '');
      }
      //{string | object | array}
      if(cfg.targets){
        var tgt = '';
        if(Array.isArray(cfg.targets)){
          cfg.targets.forEach(function(target){
            tgt = tgt + '&target=' + target;
          });
            tgt = tgt.replace(/^\&/,'');
        } else {
          tgt = 'target=' + cfg.targets;
        }
        options.targets = tgt;
      }
      if(cfg.from){
        options.from = cfg.from;
      }
      if(cfg.until){
        options.until = cfg.until;
      }
      //string: raw, csv, json, pickle
      if(cfg.format){
        options.format = cfg.format;
      }
    }
  };

  this.httpConfig = function(cfg){
    if(cfg){
      //GET, POST, PUT, etc
      if(cfg.method){
        httpConfig.method = cfg.method;
      }
      if(cfg.transformRequest){
        httpConfig.transformRequest = cfg.transformRequest;
      }
      if(cfg.transformResponse){
        httpConfig.transformResponse = cfg.transformResponse;
      }
      //{boolean|Cache}
      if(cfg.cache){
        httpConfig.cache = cfg.cache;
      }
      //{number|Promise}
      if(cfg.timeout){
        httpConfig.timeout = cfg.timeout;
      }
      //{boolean}
      if(cfg.withCredentials){
        httpConfig.withCredentials = cfg.withCredentials;
      }
    }
  };

  this.getHttpConfig = function () {
    return httpConfig;
  };

  this.getOptions = function () {
    return options;
  };

  var buildUrl = function(){
    return '';
  };

  this.$get = ['$http', function($http){

    return {

      render: function(){
          httpConfig.url = buildUrl();
          return $http(httpConfig);
      }

    };

  }];

});