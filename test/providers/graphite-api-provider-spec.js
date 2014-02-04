describe('Graphite API Provider', function(){

  var p;

  beforeEach(module('ngGraphite.providers', function(apiProviderProvider){
    p = apiProviderProvider;
  }));

  it('should create a provider', inject(function(){
    expect(p).toBeDefined();
  }));

  it('should accept configuration', inject(function(){
    p.config({method:'GET'});
    expect('GET').toEqual(p.getConfig().method);
  }));

});