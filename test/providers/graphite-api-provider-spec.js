describe('Graphite API Provider', function(){

  var p;

  beforeEach(module('ngGraphite.providers', function(apiProviderProvider){
    p = apiProviderProvider;
  }));

  afterEach(function () {
    p = {};
  });

  it('should create a provider', inject(function(){
    expect(p).toBeDefined();
  }));

  it('should configure method with GET', inject(function(){
    p.config({method:'GET'});
    expect('GET').toEqual(p.getHttpConfig().method);
  }));

  it('should configure graphite url', inject(function(){
    p.config({baseUrl:'http://localhost', targets:'target.one', from:'-2min', until:'now', format: 'json'});
    expect('http://localhost/render?target=target.one&from=-2min&until=now&format=json').toEqual(p.createGraphiteUrl());
  }));

  it('should handle extra slash in base url ', inject(function(){
    p.config({baseUrl:'http://localhost/', targets:'target.one', from:'-2min', until:'now', format: 'json'});
    expect('http://localhost/render?target=target.one&from=-2min&until=now&format=json').toEqual(p.createGraphiteUrl());
  }));

  it('should handle array of targets', inject(function(){
    p.config({baseUrl:'http://localhost', targets:['target.one', 'target.two'], from:'-2min', until:'now', format: 'json'});
    expect('http://localhost/render?target=target.one&target=target.two&from=-2min&until=now&format=json').toEqual(p.createGraphiteUrl());
  }));

  it('should set transformRequest', inject(function(){
    p.config({transformRequest:{transform: 'request'}});
    expect({transform: 'request'}).toEqual(p.getHttpConfig().transformRequest);
  }));

  it('should set transformResponse', inject(function(){
    p.config({transformResponse:{transform: 'response'}});
    expect({transform: 'response'}).toEqual(p.getHttpConfig().transformResponse);
  }));

  it('should set transformResponse', inject(function(){
    p.config({transformResponse:{transform: 'response'}});
    expect({transform: 'response'}).toEqual(p.getHttpConfig().transformResponse);
  }));

  it('should set cache to true', inject(function(){
    p.config({cache: true});
    expect(p.getHttpConfig().cache).toBe(true);
  }));

  it('should set withCredentials to true', inject(function(){
    p.config({withCredentials: true});
    expect(p.getHttpConfig().withCredentials).toBe(true);
  }));

  it('should set timeout to 15000', inject(function(){
    p.config({timeout: 15000});
    expect(15000).toEqual(p.getHttpConfig().timeout);
  }));

  it('should set format to json', inject(function(){
    p.config({format: 'json'});
    expect('json').toEqual(p.getProviderConfig().format);
  }));



});