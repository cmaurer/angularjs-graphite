describe('angularjs.grapahite', function () {
  describe('App', function () {

    it('should get a basic page', function(){
      browser.get('index.html');
      var pageBody = element(by.css('body'));
      expect(pageBody).toBeDefined();
      expect(pageBody.getTagName()).toBeDefined();
      expect(pageBody.isPresent()).toEqual(true);
    });

  })
});
