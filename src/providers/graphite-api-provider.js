ngGraphiteProviders.provider('apiProvider', function(){
  'use strict';
  var httpConfig = {}, providerConfig = {targets:''};

  this.config = function (cfg) {
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
      if(cfg.baseUrl){
        providerConfig.baseUrl = cfg.baseUrl.replace(/\/$/, '');
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
        providerConfig.targets = tgt;
      }
      if(cfg.from){
        providerConfig.from = cfg.from;
      }
      if(cfg.until){
        providerConfig.until = cfg.until;
      }
      //string: raw, csv, json, pickle
      if(cfg.format){
        providerConfig.format = cfg.format;
      }
    }
  };

  this.getHttpConfig = function () {
    return httpConfig;
  };

  this.getProviderConfig = function () {
    return providerConfig;
  };

  this.createGraphiteUrl = function() {
    //convert providerConfig into $http.params
    //url + /render?target=
    httpConfig.url = providerConfig.baseUrl + '/render?' + providerConfig.targets + '&from=' + providerConfig.from + '&until=' + providerConfig.until + '&format=' + providerConfig.format;
    return httpConfig.url;
  };

  this.getData = function($http){
    this.createGraphiteUrl();
    return $http(httpConfig);
  };

  this.$get = function($http){
    return this.getData($http);
  };

//  this.$get = ['$http', function ($http) {
//      createGraphiteUrl();
//      return $http(httpConfig);
//  }]
});