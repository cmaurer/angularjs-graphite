describe('angularjs.grapahite', function () {
  describe('App', function () {

    it('should get a basic page', function(){
      browser.get('index.html');
      var pageBody = element(by.css('body'));
      expect(pageBody).toBeDefined();
      expect(pageBody.getTagName()).toBeDefined();
      expect(pageBody.isPresent()).toEqual(true);
    });

    xit('should get graphite data', function(){

      browser.get('index.html');
      var testName = element(by.binding('testName'));
      expect(testName.getText()).toEqual('test');

      var url = element(by.binding('url'));
      expect(url.getText()).toEqual('http://localhost:9001/render?format=json&from=-1h&until=-15s&target=foobar.one.five&target=foobar.two.five&target=foobar.three.five&target=foobar.one.six&target=foobar.two.six&target=foobar.three.six&target=foobar.one.seven&target=foobar.two.seven&target=foobar.three.seven');

//      http://localhost:9001/render?format=json&from=-1h&until=-15s&target=foobar.one.five&target=foobar.two.five&target=foobar.three.five&target=foobar.one.six&target=foobar.two.six&target=foobar.three.six&target=foobar.one.seven&target=foobar.two.seven&target=foobar.three.seven
//      http://localhost:9001/render?format=json&from=-1h&until=-15s&target=foobar.one.five&target=foobar.one.six&target=foobar.one.seven&target=foobar.two.five&target=foobar.two.six&target=foobar.two.seven&target=foobar.three.five&target=foobar.three.six&target=foobar.three.seven

      var status = element(by.binding('status'));
      expect(status.getText()).toMatch('200');

    });

  })
});
