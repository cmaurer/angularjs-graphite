ngGraphiteProviders.provider('apiProvider', {

  httpConfig: {},

  config: function (cfg) {
    'use strict';
    if(cfg){
      if(cfg.method){
        this.httpConfig.method = cfg.method;
      }
      if(cfg.url){
        this.httpConfig.url = cfg.url;
      }
      if(cfg.params){
        this.httpConfig.params = cfg.params;
      }
      if(cfg.data){
        this.httpConfig.data = cfg.data;
      }
      if(cfg.transformRequest){
        this.httpConfig.transformRequest = cfg.transformRequest;
      }
      if(cfg.transformResponse){
        this.httpConfig.transformResponse = cfg.transformResponse;
      }
      if(cfg.cache){
        this.httpConfig.cache = cfg.cache;
      }
      if(cfg.timeout){
        this.httpConfig.timeout = cfg.timeout;
      }
      if(cfg.withCredentials){
        this.httpConfig.withCredentials = cfg.withCredentials;
      }
    }
  },
  getConfig: function () {
    'use strict';
    return this.httpConfig;
  },
  $get: function ($http) {
    'use strict';
    return{

      getData: function () {
        return $http(this.httpConfig);
      }

    };
  }
});