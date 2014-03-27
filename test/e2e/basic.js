describe('angularjs.grapahite', function () {
  describe('App', function () {

    it('should get a basic page', function(){
      browser.get('index.html');
      var pageBody = element(by.css('body'));
      expect(pageBody).toBeDefined();
      expect(pageBody.getTagName()).toBeDefined();
      expect(pageBody.isPresent()).toEqual(true);
    });

    it('should render graphite targets with ng-repeat', function(){

      browser.get('index.html');
      var testName = element(by.binding('testName'));
      expect(testName.getText()).toEqual('test');

      var url = element(by.binding('url'));
      expect(url.getText()).toEqual('http://localhost:9001/render?format=json&from=-1h&until=-15s&target=one.two');

      var status = element(by.binding('status'));
      expect(status.getText()).toMatch('200');

    });

  })
});
