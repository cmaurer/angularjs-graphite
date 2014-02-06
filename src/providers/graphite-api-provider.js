ngGraphiteProviders.provider('apiProvider', {

  httpConfig: {}, providerConfig: {targets:''},

  config: function (cfg) {
    'use strict';
    if(cfg){
      //GET, POST, PUT, etc
      if(cfg.method){
        this.httpConfig.method = cfg.method;
      }
      //url – {string} – Absolute or relative URL of the resource that is being requested.
//      if(cfg.url){
//        this.httpConfig.url = cfg.url;
//      }
//      if(cfg.params){
//        this.httpConfig.params = cfg.params;
//      }
//      if(cfg.data){
//        this.httpConfig.data = cfg.data;
//      }
      if(cfg.transformRequest){
        this.httpConfig.transformRequest = cfg.transformRequest;
      }
      if(cfg.transformResponse){
        this.httpConfig.transformResponse = cfg.transformResponse;
      }

      //{boolean|Cache}
      if(cfg.cache){
          this.httpConfig.cache = cfg.cache;
      }
      //{number|Promise}
      if(cfg.timeout){
        this.httpConfig.timeout = cfg.timeout;
      }
      //{boolean}
      if(cfg.withCredentials){
        this.httpConfig.withCredentials = cfg.withCredentials;
      }
      if(cfg.baseUrl){
        this.providerConfig.baseUrl = cfg.baseUrl.replace(/\/$/, '');
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
        this.providerConfig.targets = tgt;
      }
      if(cfg.from){
        this.providerConfig.from = cfg.from;
      }
      if(cfg.until){
        this.providerConfig.until = cfg.until;
      }
      //string: raw, csv, json, pickle
      if(cfg.format){
        this.providerConfig.format = cfg.format;
      }
    }
  },
  getHttpConfig: function () {
    'use strict';
    return this.httpConfig;
  },
  getProviderConfig: function () {
    'use strict';
    return this.providerConfig;
  },
  createGraphiteUrl: function(){
    'use strict';
    //convert providerConfig into $http.params
    //url + /render?target=
    this.httpConfig.url = this.providerConfig.baseUrl + '/render?' + this.providerConfig.targets + '&from=' + this.providerConfig.from + '&until=' + this.providerConfig.until + '&format=' + this.providerConfig.format;
    return this.httpConfig.url;
  },
  $get: function ($http) {
    'use strict';
    return {

      getData: function () {
        this.createGraphiteUrl();
        return $http(this.httpConfig);
      }

    };
  }
});