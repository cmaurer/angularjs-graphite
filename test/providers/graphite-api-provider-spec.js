describe('Graphite API Provider', function(){

  var p;

  beforeEach(module('ngGraphite.providers', function(apiProviderProvider){
    p = apiProviderProvider;
  }));

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

});