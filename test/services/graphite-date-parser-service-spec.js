'use strict';

describe('Graphite Date Parser', function(){


  describe('Relative Time Parser', function(){

    var par;

    beforeEach(function () {
      par = function () {
        var parser = new Parser({});
        return parser.parse.apply(parser, arguments);
      };

    });

    /**
     *
     * RELATIVE_TIME is a length of time since the current time. It is always preceded my a minus sign ( - ) and follow by a unit of time. Valid units of time:
     * s	Seconds
     * min	Minutes
     * h	Hours
     * d	Days
     * w	Weeks
     * mon	30 Days (month)
     * y	365 Days (year)
     */
    it('should parse relative time - seconds', function(){
      var now = new Date(), date = par('-30s');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect((now.getTime() - date.getTime()) > 0).toBe(true);
      expect((now.getTime() - date.getTime()) >= 29000).toBe(true);
    });

    it('should parse relative time - minutes', function(){
      var now = new Date(), date = par('-30min');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect((now.getTime() - date.getTime()) > 0).toBe(true);
      expect((now.getTime() - date.getTime()) >= 1709000).toBe(true);
    });

    it('should parse relative time - hours', function(){
      var now = new Date(), date = par('-30h');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect((now.getTime() - date.getTime()) > 0).toBe(true);
      expect((now.getTime() - date.getTime()) >= 107008000).toBe(true);
    });

    it('should parse relative time - days', function(){
      var now = new Date(), date = par('-30d');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect((now.getTime() - date.getTime()) > 0).toBe(true);
      expect((now.getTime() - date.getTime()) >= 2592000000).toBe(true);
    });

    it('should parse relative time - weeks', function(){
      var now = new Date(), date = par('-30w');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect((now.getTime() - date.getTime()) > 0).toBe(true);
      expect((now.getTime() - date.getTime()) >= 18143008000).toBe(true);
    });

    it('should parse relative time - months', function(){
      var now = new Date(), date = par('-30mon');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect((now.getTime() - date.getTime()) > 0).toBe(true);
      expect((now.getTime() - date.getTime()) >= (30 * 2.62974e9)).toBe(true);
    });

    it('should parse relative time - years', function(){
      var now = new Date(), date = par('-30y');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect((now.getTime() - date.getTime()) > 0).toBe(true);
      expect((now.getTime() - date.getTime()) >= (30 * 3.15569e10)).toBe(true);
    });

    it('should parse relative time - now', function(){
      var now = new Date(), date = par('now');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect(now.getDay()).toEqual(date.getDay());
      expect(now.getMonth()).toEqual(date.getMonth());
      expect(now.getHours()).toEqual(date.getHours());
      expect(now.getMinutes()).toEqual(date.getMinutes());
    });

    it('should not parse an invalid relative time', function(){
      var date = par('foobar');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
    });

  });

  describe('Absolute Time Parser', function(){

    var par;

    beforeEach(function () {
      par = function () {
        var parser = new Parser({});
        return parser.parse.apply(parser, arguments);
      };

    });

    /**
     * HH:MM_YYMMDD, YYYYMMDD, MM/DD/YY
     */
    it('should parse absolute time - HH:MM_YYMMDD', function(){
      var date = par('20:00_140102');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect(date.getDate()).toEqual(2);
      expect(date.getMonth()).toEqual(0);
      expect(date.getHours()).toEqual(20);
      expect(date.getMinutes()).toEqual(0);
      expect(date.getSeconds()).toEqual(0);
      expect(date.getMilliseconds()).toEqual(0);
      expect(date.getFullYear()).toEqual(2014);
    });

    it('should parse absolute time - YYYYMMDD', function(){
      var date = par('20140102');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect(date.getDate()).toEqual(2);
      expect(date.getMonth()).toEqual(0);
      expect(date.getHours()).toEqual(0);
      expect(date.getMinutes()).toEqual(0);
      expect(date.getSeconds()).toEqual(0);
      expect(date.getMilliseconds()).toEqual(0);
      expect(date.getFullYear()).toEqual(2014);
    });

    it('should parse absolute time - MM/DD/YY', function(){
      var date = par('01/02/14');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect(date.getDate()).toEqual(2);
      expect(date.getMonth()).toEqual(0);
      expect(date.getHours()).toEqual(0);
      expect(date.getMinutes()).toEqual(0);
      expect(date.getSeconds()).toEqual(0);
      expect(date.getMilliseconds()).toEqual(0);
      expect(date.getFullYear()).toEqual(2014);
    });

    it('should parse absolute time - YYYY-MM-DD HH:MM:SS', function(){
      var date = par('2014-01-02 20:21:22');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect(date.getDate()).toEqual(2);
      expect(date.getMonth()).toEqual(0);
      expect(date.getHours()).toEqual(20);
      expect(date.getMinutes()).toEqual(21);
      expect(date.getSeconds()).toEqual(22);
      expect(date.getMilliseconds()).toEqual(0);
      expect(date.getFullYear()).toEqual(2014);
    });

    xit('should parse absolute time - YYYY-MM-DDTHH:MM:SS', function(){
      var date = par('2014-02-03T21:22:23');
      expect(date).toBeDefined();
    console.log('date', date, date.getDate(), date.getMonth());
      expect(angular.isDate(date)).toBe(true);
      expect(date.getDate()).toEqual(3);
      expect(date.getMonth()).toEqual(1);
      expect(date.getHours()).toEqual(21);
      expect(date.getMinutes()).toEqual(22);
      expect(date.getSeconds()).toEqual(23);
      expect(date.getMilliseconds()).toEqual(0);
      expect(date.getFullYear()).toEqual(2014);
    });

    xit('should parse absolute time - YYYY-MM-DDTHH:MM:SSTZD - +hh:mm', function(){
      var date = par('2014-01-02T20:21:22+5:00');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect(date.getDate()).toEqual(2);
      expect(date.getMonth()).toEqual(0);
      expect(date.getHours()).toEqual(20);
      expect(date.getMinutes()).toEqual(21);
      expect(date.getSeconds()).toEqual(22);
      expect(date.getMilliseconds()).toEqual(0);
      expect(date.getFullYear()).toEqual(2014);
    });

    xit('should parse absolute time, YYYY-MM-DDTHH:MM:SSTZD, -hh:mm', function(){
      var date = par('2014-01-02T20:21:22-5:00');
      expect(date).toBeDefined();
      expect(angular.isDate(date)).toBe(true);
      expect(date.getDate()).toEqual(2);
      expect(date.getMonth()).toEqual(0);
      expect(date.getHours()).toEqual(20);
      expect(date.getMinutes()).toEqual(21);
      expect(date.getSeconds()).toEqual(22);
      expect(date.getMilliseconds()).toEqual(0);
      expect(date.getFullYear()).toEqual(2014);
    });

  });

});