describe('Graphite API Provider', function(){

  var p;

  beforeEach(module('ngGraphite.providers', function(GraphiteProvider){
    p = GraphiteProvider;
  }));

  afterEach(function () {
    p = {};
  });

  it('should create a provider', inject(function(){
    expect(p).toBeDefined();
  }));

  it('should set default method to GET', inject(function(){
    p.setDefaultMethod('GET');
  }));

  it('should set default port to 1234', inject(function(){
    p.setDefaultPort(1234);
    expect(p.buildUrl()).toBeDefined();
    expect(p.buildUrl()).toEqual('http://localhost:1234/render?format=json&from=-24h&until=now');
  }));

  it('should set default protocol to https', inject(function(){
    p.setDefaultProtocol('https');
    expect(p.buildUrl()).toBeDefined();
    expect(p.buildUrl()).toEqual('https://localhost:80/render?format=json&from=-24h&until=now');
  }));

  it('should set default host to metrics.graphite.com', inject(function(){
    p.setDefaultHost('metrics.graphite.com');
    expect(p.buildUrl()).toBeDefined();
    expect(p.buildUrl()).toEqual('http://metrics.graphite.com:80/render?format=json&from=-24h&until=now');
  }));

  it('should set default path to /find', inject(function(){
    p.setDefaultPath('/find');
    expect(p.buildUrl()).toBeDefined();
    expect(p.buildUrl()).toEqual('http://localhost:80/find?format=json&from=-24h&until=now');
  }));

  it('should set default format to raw', inject(function(){
    p.setDefaultFormat('raw');
    expect(p.buildUrl()).toBeDefined();
    expect(p.buildUrl()).toEqual('http://localhost:80/render?format=raw&from=-24h&until=now');
  }));

  it('should set default from to -2h', inject(function(){
    p.setDefaultFrom('-2h');
    expect(p.buildUrl()).toBeDefined();
    expect(p.buildUrl()).toEqual('http://localhost:80/render?format=json&from=-2h&until=now');
  }));

  it('should set from with buildUrl', inject(function(){
    expect(p.buildUrl('/render', '', '-3d', 'now')).toEqual('http://localhost:80/render?format=json&from=-3d&until=now');
  }));

  it('should set default until to -15s', inject(function(){
    p.setDefaultUntil('-15s');
    expect(p.buildUrl()).toBeDefined();
    expect(p.buildUrl()).toEqual('http://localhost:80/render?format=json&from=-24h&until=-15s');
  }));

  it('should set until with buildUrl', inject(function(){
    expect(p.buildUrl('/render', '', null, '-15min')).toEqual('http://localhost:80/render?format=json&from=-24h&until=-15min');
  }));

  it('should set one target with buildUrl', inject(function(){
    expect(p.buildUrl('/render', ['one.two.three'])).toEqual('http://localhost:80/render?format=json&from=-24h&until=now&target=one.two.three');
  }));

  it('should set two targets with buildUrl', inject(function(){
    expect(p.buildUrl('/render', ['one.two.three', 'four.five.six'])).toEqual('http://localhost:80/render?format=json&from=-24h&until=now&target=one.two.three&target=four.five.six');
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

  xit('should set transformRequest', inject(function(){
    p.httpConfig({transformRequest:{transform: 'request'}});
    expect({transform: 'request'}).toEqual(p.getHttpConfig().transformRequest);
  }));

  xit('should set transformResponse', inject(function(){
    p.httpConfig({transformResponse:{transform: 'response'}});
    expect({transform: 'response'}).toEqual(p.getHttpConfig().transformResponse);
  }));

  xit('should set transformResponse', inject(function(){
    p.httpConfig({transformResponse:{transform: 'response'}});
    expect({transform: 'response'}).toEqual(p.getHttpConfig().transformResponse);
  }));

  xit('should set cache to true', inject(function(){
    p.httpConfig({cache: true});
    expect(p.getHttpConfig().cache).toBe(true);
  }));

  xit('should set withCredentials to true', inject(function(){
    p.httpConfig({withCredentials: true});
    expect(p.getHttpConfig().withCredentials).toBe(true);
  }));

});