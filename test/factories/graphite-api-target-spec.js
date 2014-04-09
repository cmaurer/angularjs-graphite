describe('Graphite Target Factory ', function(){
  'use strict';

  beforeEach(module('ngGraphite.factories'));

  describe('Character List ', function(){
    var graphiteTargetBuilder;
    beforeEach(module('ngGraphite.factories'));
    beforeEach(inject(function(GraphiteTargetBuilder){
      graphiteTargetBuilder = GraphiteTargetBuilder;
    }));

    //foo[a]bar
    it('should create a single metric from a single character list.', function(){
      var buildTarget = 'foo[a]bar',
      result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(1);
      expect(result.indexOf('fooabar')).toNotEqual(-1);
    });

    //foo[ab]bar
    it('should create a multiple metrics from a single character list with multiple entries.', function(){
      var buildTarget = 'foo[atr]bar',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(3);
      expect(result.indexOf('fooabar')).toNotEqual(-1);
      expect(result.indexOf('footbar')).toNotEqual(-1);
      expect(result.indexOf('foorbar')).toNotEqual(-1);
    });

    //foo[a]bar[b]
    it('should create a single metric from multiple character lists.', function(){
      var buildTarget = 'foo[a]bar[e]',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(1);
      expect(result.indexOf('fooabare')).toNotEqual(-1);
    });

    //foo[ab]bar[ef]
    it('should create multiple metrics from multiple character lists.', function(){
      var buildTarget = 'foo[ab]bar[ef]',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(4);
      expect(result.indexOf('fooabare')).toNotEqual(-1);
      expect(result.indexOf('fooabarf')).toNotEqual(-1);
      expect(result.indexOf('foobbare')).toNotEqual(-1);
      expect(result.indexOf('foobbarf')).toNotEqual(-1);
    });

    it('should create multiple metrics from back to back character lists.', function(){
      var buildTarget = 'foo[ab][ef]bar',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(4);
      expect(result.indexOf('fooaebar')).toNotEqual(-1);
      expect(result.indexOf('fooafbar')).toNotEqual(-1);
      expect(result.indexOf('foobebar')).toNotEqual(-1);
      expect(result.indexOf('foobfbar')).toNotEqual(-1);
    });

    it('should create multiple metrics from more than two character lists.', function(){
      var buildTarget = 'foo[ab]bar[ef]ing[mn]',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(8);

      expect(result.indexOf('fooabareingm')).toNotEqual(-1);
      expect(result.indexOf('fooabareingn')).toNotEqual(-1);

      expect(result.indexOf('fooabarfingm')).toNotEqual(-1);
      expect(result.indexOf('fooabarfingn')).toNotEqual(-1);

      expect(result.indexOf('foobbareingm')).toNotEqual(-1);
      expect(result.indexOf('foobbareingn')).toNotEqual(-1);

      expect(result.indexOf('foobbarfingm')).toNotEqual(-1);
      expect(result.indexOf('foobbarfingn')).toNotEqual(-1);

    });

  });

  describe('Character Range ', function(){
    var graphiteTargetBuilder;
    beforeEach(module('ngGraphite.factories'));
    beforeEach(inject(function(GraphiteTargetBuilder){
      graphiteTargetBuilder = GraphiteTargetBuilder;
    }));

    //foo[a-c]bar
    it('should create multiple metrics from a single character range.', function(){
      var buildTarget = 'foo[a-c]bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(3);
        expect(result.indexOf('fooabar')).toNotEqual(-1);
        expect(result.indexOf('foobbar')).toNotEqual(-1);
        expect(result.indexOf('foocbar')).toNotEqual(-1);
    });

    //foo[a-c]bar[e-g]
    it('should create multiple metrics from multiple character ranges.', function(){
      var buildTarget = 'foo[a-c]bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(3);
        expect(result.indexOf('fooabar')).toNotEqual(-1);
        expect(result.indexOf('foobbar')).toNotEqual(-1);
        expect(result.indexOf('foocbar')).toNotEqual(-1);
    });

    it('should create multiple metrics from back to back character ranges.', function(){
      var buildTarget = 'foo[a-c][d-f]bar',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(9);
      expect(result.indexOf('fooadbar')).toNotEqual(-1);
      expect(result.indexOf('fooaebar')).toNotEqual(-1);
      expect(result.indexOf('fooafbar')).toNotEqual(-1);

      expect(result.indexOf('foobdbar')).toNotEqual(-1);
      expect(result.indexOf('foobebar')).toNotEqual(-1);
      expect(result.indexOf('foobfbar')).toNotEqual(-1);

      expect(result.indexOf('foocdbar')).toNotEqual(-1);
      expect(result.indexOf('foocebar')).toNotEqual(-1);
      expect(result.indexOf('foocfbar')).toNotEqual(-1);

    });

    it('should create multiple metrics from more than two character ranges.', function(){
      var buildTarget = 'foo.[a-c].bar.[d-f].ing.[g-i]',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(27);
      expect(result.indexOf('foo.a.bar.d.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.a.bar.d.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.a.bar.d.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.a.bar.e.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.a.bar.e.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.a.bar.e.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.a.bar.f.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.a.bar.f.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.a.bar.f.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.b.bar.d.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.b.bar.d.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.b.bar.d.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.b.bar.e.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.b.bar.e.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.b.bar.e.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.b.bar.f.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.b.bar.f.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.b.bar.f.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.c.bar.d.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.c.bar.d.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.c.bar.d.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.c.bar.e.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.c.bar.e.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.c.bar.e.ing.i')).toNotEqual(-1);

      expect(result.indexOf('foo.c.bar.f.ing.g')).toNotEqual(-1);
      expect(result.indexOf('foo.c.bar.f.ing.h')).toNotEqual(-1);
      expect(result.indexOf('foo.c.bar.f.ing.i')).toNotEqual(-1);

    });

  });

  describe('Number Range ', function(){
    var graphiteTargetBuilder;
    beforeEach(module('ngGraphite.factories'));
    beforeEach(inject(function(GraphiteTargetBuilder){
      graphiteTargetBuilder = GraphiteTargetBuilder;
    }));

    //foo[1-3]bar
    it('should create a multiple metrics from a single number range.', function(){
      var buildTarget = 'foo[1-3]bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(3);
        expect(result.indexOf('foo1bar')).toNotEqual(-1);
        expect(result.indexOf('foo2bar')).toNotEqual(-1);
        expect(result.indexOf('foo3bar')).toNotEqual(-1);
    });

    //foo[1-3]bar[5-7]
    it('should create multiple metrics from multiple number ranges.', function(){
      var buildTarget = 'foo[1-3]bar[5-7]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foo1bar5')).toNotEqual(-1);
        expect(result.indexOf('foo1bar6')).toNotEqual(-1);
        expect(result.indexOf('foo1bar7')).toNotEqual(-1);
        expect(result.indexOf('foo2bar5')).toNotEqual(-1);
        expect(result.indexOf('foo2bar6')).toNotEqual(-1);
        expect(result.indexOf('foo2bar7')).toNotEqual(-1);
        expect(result.indexOf('foo3bar5')).toNotEqual(-1);
        expect(result.indexOf('foo3bar6')).toNotEqual(-1);
        expect(result.indexOf('foo3bar7')).toNotEqual(-1);
    });

    it('should create multiple metrics from multiple number ranges with periods between ranges.', function(){
      var buildTarget = 'foo.[1-3].bar.[5-7]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foo.1.bar.5')).toNotEqual(-1);
        expect(result.indexOf('foo.1.bar.6')).toNotEqual(-1);
        expect(result.indexOf('foo.1.bar.7')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.5')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.6')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.7')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.5')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.6')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.7')).toNotEqual(-1);
    });

    it('should create multiple metrics from back to back number ranges.', function(){
      var buildTarget = 'foo.[1-3][5-7].bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foo.15.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.16.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.17.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.25.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.26.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.27.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.35.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.36.bar')).toNotEqual(-1);
        expect(result.indexOf('foo.37.bar')).toNotEqual(-1);
    });

    it('should create multiple metrics from three number ranges.', function(){
      var buildTarget = 'foo.[1-3].bar.[5-7].ing.[8-9]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(18);

        expect(result.indexOf('foo.1.bar.5.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.1.bar.5.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.1.bar.6.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.1.bar.6.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.1.bar.7.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.1.bar.7.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.5.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.5.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.6.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.6.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.7.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.2.bar.7.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.5.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.5.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.6.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.6.ing.9')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.7.ing.8')).toNotEqual(-1);
        expect(result.indexOf('foo.3.bar.7.ing.9')).toNotEqual(-1);
    });
  });

  describe('Value List ', function(){
    var graphiteTargetBuilder;
    beforeEach(module('ngGraphite.factories'));
    beforeEach(inject(function(GraphiteTargetBuilder){
      graphiteTargetBuilder = GraphiteTargetBuilder;
    }));

    it('should create multiple metrics from a value list.', function(){
      var buildTarget = 'foobar.{one,two,three}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(3);
        expect(result.indexOf('foobar.one')).toNotEqual(-1);
        expect(result.indexOf('foobar.two')).toNotEqual(-1);
        expect(result.indexOf('foobar.three')).toNotEqual(-1);
    });

    it('should create multiple metrics from multiple value lists.', function(){
      var buildTarget = 'foobar.{one,two,three}.{five,six,seven}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.one.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.one.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.one.seven')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.seven')).toNotEqual(-1);
        expect(result.indexOf('foobar.three.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.three.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.three.seven')).toNotEqual(-1);
    });

    it('should create multiple metrics from multiple value lists.', function(){
      var buildTarget = 'foobar.{one,two,three}{five,six,seven}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.onefive')).toNotEqual(-1);
        expect(result.indexOf('foobar.onesix')).toNotEqual(-1);
        expect(result.indexOf('foobar.oneseven')).toNotEqual(-1);
        expect(result.indexOf('foobar.twofive')).toNotEqual(-1);
        expect(result.indexOf('foobar.twosix')).toNotEqual(-1);
        expect(result.indexOf('foobar.twoseven')).toNotEqual(-1);
        expect(result.indexOf('foobar.threefive')).toNotEqual(-1);
        expect(result.indexOf('foobar.threesix')).toNotEqual(-1);
        expect(result.indexOf('foobar.threeseven')).toNotEqual(-1);
    });

    it('should create multiple metrics from three value lists.', function(){
      var buildTarget = 'foobar.{one,two}.bar.{three,four}.ing.{five,six}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(8);
        expect(result.indexOf('foobar.one.bar.three.ing.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.one.bar.three.ing.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.one.bar.four.ing.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.one.bar.four.ing.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.bar.three.ing.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.bar.three.ing.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.bar.four.ing.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.bar.four.ing.six')).toNotEqual(-1);
    });

    it('should create metrics from value lists with special characters.', function() {
      var buildTarget = 'foobar.{one.two,three.four}.bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(2);
        expect(result.indexOf('foobar.one.two.bar')).toNotEqual(-1);
        expect(result.indexOf('foobar.three.four.bar')).toNotEqual(-1);
    });

    it('should create metrics from back to back value lists.', function() {
      var buildTarget = 'foobar.{one,two}{three,four}.bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(4);
        expect(result.indexOf('foobar.onethree.bar')).toNotEqual(-1);
        expect(result.indexOf('foobar.onefour.bar')).toNotEqual(-1);
        expect(result.indexOf('foobar.twothree.bar')).toNotEqual(-1);
        expect(result.indexOf('foobar.twofour.bar')).toNotEqual(-1);
    });

    it('should create metrics from back to back value lists with special characters.', function() {
      var buildTarget = 'foobar.{one.a,two.b}{three.c,four.d}.bar',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(4);
      expect(result.indexOf('foobar.one.athree.c.bar')).toNotEqual(-1);
      expect(result.indexOf('foobar.one.afour.d.bar')).toNotEqual(-1);
      expect(result.indexOf('foobar.two.bthree.c.bar')).toNotEqual(-1);
      expect(result.indexOf('foobar.two.bfour.d.bar')).toNotEqual(-1);
    });

  });

  describe('Mixed Cases', function() {
    var graphiteTargetBuilder;
    beforeEach(module('ngGraphite.factories'));
    beforeEach(inject(function (GraphiteTargetBuilder) {
      graphiteTargetBuilder = GraphiteTargetBuilder;
    }));

    it('should create metrics from a range first and a value list second.', function(){
      var buildTarget = 'foobar.[1-3].{five,six,seven}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.1.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.seven')).toNotEqual(-1);
        expect(result.indexOf('foobar.2.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.2.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.2.seven')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.five')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.six')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.seven')).toNotEqual(-1);
    });

    it('should create metrics from back to back range first and a value list second.', function(){
      var buildTarget = 'foobar.[1-3]{five,six,seven}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.1five')).toNotEqual(-1);
        expect(result.indexOf('foobar.1six')).toNotEqual(-1);
        expect(result.indexOf('foobar.1seven')).toNotEqual(-1);
        expect(result.indexOf('foobar.2five')).toNotEqual(-1);
        expect(result.indexOf('foobar.2six')).toNotEqual(-1);
        expect(result.indexOf('foobar.2seven')).toNotEqual(-1);
        expect(result.indexOf('foobar.3five')).toNotEqual(-1);
        expect(result.indexOf('foobar.3six')).toNotEqual(-1);
        expect(result.indexOf('foobar.3seven')).toNotEqual(-1);
    });

    it('should create metrics from a value list first and a range second.', function(){
      var buildTarget = 'foobar.{one,two,three}.[5-7]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.one.5')).toNotEqual(-1);
        expect(result.indexOf('foobar.one.6')).toNotEqual(-1);
        expect(result.indexOf('foobar.one.7')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.5')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.6')).toNotEqual(-1);
        expect(result.indexOf('foobar.two.7')).toNotEqual(-1);
        expect(result.indexOf('foobar.three.5')).toNotEqual(-1);
        expect(result.indexOf('foobar.three.6')).toNotEqual(-1);
        expect(result.indexOf('foobar.three.7')).toNotEqual(-1);
    });

    it('should create metrics from back to back value list first and a range second.', function(){
      var buildTarget = 'foobar.{one,two,three}[5-7]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.one5')).toNotEqual(-1);
        expect(result.indexOf('foobar.one6')).toNotEqual(-1);
        expect(result.indexOf('foobar.one7')).toNotEqual(-1);
        expect(result.indexOf('foobar.two5')).toNotEqual(-1);
        expect(result.indexOf('foobar.two6')).toNotEqual(-1);
        expect(result.indexOf('foobar.two7')).toNotEqual(-1);
        expect(result.indexOf('foobar.three5')).toNotEqual(-1);
        expect(result.indexOf('foobar.three6')).toNotEqual(-1);
        expect(result.indexOf('foobar.three7')).toNotEqual(-1);
    });

    it('should create metrics from a range, character list.', function(){
      var buildTarget = 'foobar.[1-3].[ABC]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.1.A')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.B')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.C')).toNotEqual(-1);
        expect(result.indexOf('foobar.2.A')).toNotEqual(-1);
        expect(result.indexOf('foobar.2.B')).toNotEqual(-1);
        expect(result.indexOf('foobar.2.C')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.A')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.B')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.C')).toNotEqual(-1);
    });

    it('should create metrics from back to back range, character list.', function(){
      var buildTarget = 'foobar.[1-3][ABC]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect(result.indexOf('foobar.1A')).toNotEqual(-1);
        expect(result.indexOf('foobar.1B')).toNotEqual(-1);
        expect(result.indexOf('foobar.1C')).toNotEqual(-1);
        expect(result.indexOf('foobar.2A')).toNotEqual(-1);
        expect(result.indexOf('foobar.2B')).toNotEqual(-1);
        expect(result.indexOf('foobar.2C')).toNotEqual(-1);
        expect(result.indexOf('foobar.3A')).toNotEqual(-1);
        expect(result.indexOf('foobar.3B')).toNotEqual(-1);
        expect(result.indexOf('foobar.3C')).toNotEqual(-1);
    });

    it('should create metrics from a range, character list.', function(){
      var buildTarget = 'foobar.[13].[6-9]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(8);
        expect(result.indexOf('foobar.1.6')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.7')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.8')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.9')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.6')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.7')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.8')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.9')).toNotEqual(-1);
    });

    it('should create metrics from back to back range, character list.', function(){
      var buildTarget = 'foobar.[13][6-9]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(8);
        expect(result.indexOf('foobar.16')).toNotEqual(-1);
        expect(result.indexOf('foobar.17')).toNotEqual(-1);
        expect(result.indexOf('foobar.18')).toNotEqual(-1);
        expect(result.indexOf('foobar.19')).toNotEqual(-1);
        expect(result.indexOf('foobar.36')).toNotEqual(-1);
        expect(result.indexOf('foobar.37')).toNotEqual(-1);
        expect(result.indexOf('foobar.38')).toNotEqual(-1);
        expect(result.indexOf('foobar.39')).toNotEqual(-1);
    });

    it('should create metrics from a range, value list.', function(){
      var buildTarget = 'foobar.[13].{6,7,8,9}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(8);
        expect(result.indexOf('foobar.1.6')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.7')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.8')).toNotEqual(-1);
        expect(result.indexOf('foobar.1.9')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.6')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.7')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.8')).toNotEqual(-1);
        expect(result.indexOf('foobar.3.9')).toNotEqual(-1);
    });

    it('should create metrics from a back to back range, value list.', function(){
      var buildTarget = 'foobar.[13]{6,7,8,9}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(8);
        expect(result.indexOf('foobar.16')).toNotEqual(-1);
        expect(result.indexOf('foobar.17')).toNotEqual(-1);
        expect(result.indexOf('foobar.18')).toNotEqual(-1);
        expect(result.indexOf('foobar.19')).toNotEqual(-1);
        expect(result.indexOf('foobar.36')).toNotEqual(-1);
        expect(result.indexOf('foobar.37')).toNotEqual(-1);
        expect(result.indexOf('foobar.38')).toNotEqual(-1);
        expect(result.indexOf('foobar.39')).toNotEqual(-1);
    });

  });

});

