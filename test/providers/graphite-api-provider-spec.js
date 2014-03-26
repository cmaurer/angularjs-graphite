describe('Graphite API Provider', function(){

  var p;

  beforeEach(module('ngGraphite.providers', function(graphiteProvider){
    p = graphiteProvider;
  }));

  afterEach(function () {
    p = {};
  });

  it('should create a provider', inject(function(){
    expect(p).toBeDefined();
  }));

  it('should configure method with GET', inject(function(){
    p.httpConfig({method:'GET'});
    expect('GET').toEqual(p.getHttpConfig().method);
  }));

  xit('should configure graphite url', inject(function(){
    p.config({baseUrl:'http://localhost', targets:'target.one', from:'-2min', until:'now', format: 'json'});
    expect('http://localhost/render?target=target.one&from=-2min&until=now&format=json').toEqual(p.createGraphiteUrl());
  }));

  xit('should handle extra slash in base url ', inject(function(){
    p.config({baseUrl:'http://localhost/', targets:'target.one', from:'-2min', until:'now', format: 'json'});
    expect('http://localhost/render?target=target.one&from=-2min&until=now&format=json').toEqual(p.createGraphiteUrl());
  }));

  xit('should handle array of targets', inject(function(){
    p.config({baseUrl:'http://localhost', targets:['target.one', 'target.two'], from:'-2min', until:'now', format: 'json'});
    expect('http://localhost/render?target=target.one&target=target.two&from=-2min&until=now&format=json').toEqual(p.createGraphiteUrl());
  }));

  it('should set transformRequest', inject(function(){
    p.httpConfig({transformRequest:{transform: 'request'}});
    expect({transform: 'request'}).toEqual(p.getHttpConfig().transformRequest);
  }));

  it('should set transformResponse', inject(function(){
    p.httpConfig({transformResponse:{transform: 'response'}});
    expect({transform: 'response'}).toEqual(p.getHttpConfig().transformResponse);
  }));

  it('should set transformResponse', inject(function(){
    p.httpConfig({transformResponse:{transform: 'response'}});
    expect({transform: 'response'}).toEqual(p.getHttpConfig().transformResponse);
  }));

  it('should set cache to true', inject(function(){
    p.httpConfig({cache: true});
    expect(p.getHttpConfig().cache).toBe(true);
  }));

  it('should set withCredentials to true', inject(function(){
    p.httpConfig({withCredentials: true});
    expect(p.getHttpConfig().withCredentials).toBe(true);
  }));

  it('should set timeout to 15000', inject(function(){
    p.httpConfig({timeout: 15000});
    expect(15000).toEqual(p.getHttpConfig().timeout);
  }));

  xit('should set format to json', inject(function(){
    p.config({format: 'json'});
    expect('json').toEqual(p.getProviderConfig().format);
  }));


});

describe('Graphite API $http Service Provider', function(){
  'use strict';

  describe('when calling getData', function () {

    var p, _$http, _$httpBackend;

    beforeEach(module('ngGraphite.providers', function(graphiteProvider){
      p = graphiteProvider;
    }));

    beforeEach(inject(function ($http, $httpBackend) {
      _$http = $http;
      _$httpBackend = $httpBackend
    }));

    afterEach(function() {
      _$httpBackend.verifyNoOutstandingExpectation();
      _$httpBackend.verifyNoOutstandingRequest();
    });


    it('should return graphite data', function(){
      expect(p).toBeDefined();

//      _$httpBackend.expect('GET', '/render?target=target.one&target=target.two&from=-2min&until=now&format=json')
//        .respond([{}]);

//      p.config({baseUrl:'http://localhost', targets:['target.one', 'target.two'], from:'-2min', until:'now', format: 'json'});
//      p.getData();

//      _$httpBackend.flush();

    });
  });

});
