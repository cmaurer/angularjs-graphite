'use strict';

describe('Graphite Date Parser', function(){


  describe('Parser', function(){


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
      var date = par('-30s');
      expect(date).toBeDefined();
    });

    it('should parse relative time - minutes', function(){
      var date = par('-30min');
      expect(date).toBeDefined();
    });

    it('should parse relative time - hours', function(){
      var date = par('-30h');
      expect(date).toBeDefined();
    });

    it('should parse relative time - days', function(){
      var date = par('-30d');
      expect(date).toBeDefined();
    });

    it('should parse relative time - weeks', function(){
      var date = par('-30w');
      expect(date).toBeDefined();
    });

    it('should parse relative time - months', function(){
      var date = par('-30mon');
      expect(date).toBeDefined();
    });

    it('should parse relative time - years', function(){
      var date = par('-30y');
      expect(date).toBeDefined();
    });

    it('should not parse an invalid relative time', function(){
    });

  });



});