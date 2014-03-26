describe('Graphite Target Factory ', function(){
  "use strict";

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
      expect('fooabar').toEqual(result[0]);
    });

    //foo[ab]bar
    it('should create a multiple metrics from a single character list with multiple entries.', function(){
      var buildTarget = 'foo[atr]bar',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(3);
      expect('fooabar').toEqual(result[0]);
      expect('footbar').toEqual(result[1]);
      expect('foorbar').toEqual(result[2]);
    });

    //foo[a]bar[b]
    it('should create a single metric from multiple character lists.', function(){
      var buildTarget = 'foo[a]bar[e]',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(1);
      expect('fooabare').toEqual(result[0]);
    });

    //foo[ab]bar[ef]
    it('should create a multiple metrics from multiple character lists.', function(){
      var buildTarget = 'foo[ab]bar[ef]',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(4);
      expect('fooabare').toEqual(result[0]);
      expect('fooabarf').toEqual(result[1]);
      expect('foobbare').toEqual(result[2]);
      expect('foobbarf').toEqual(result[3]);
    });

  });

  describe('Character Range ', function(){
    var graphiteTargetBuilder;
    beforeEach(module('ngGraphite.factories'));
    beforeEach(inject(function(GraphiteTargetBuilder){
      graphiteTargetBuilder = GraphiteTargetBuilder;
    }));

    //foo[a-c]bar
    it('should create a multiple metrics from a single character range.', function(){
      var buildTarget = 'foo[a-c]bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(3);
        expect('fooabar').toEqual(result[0]);
        expect('foobbar').toEqual(result[1]);
        expect('foocbar').toEqual(result[2]);
    });

    //foo[a-c]bar[e-g]
    it('should create a multiple metrics from a multiple character ranges.', function(){
      var buildTarget = 'foo[a-c]bar',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(3);
        expect('fooabar').toEqual(result[0]);
        expect('foobbar').toEqual(result[1]);
        expect('foocbar').toEqual(result[2]);
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
        expect('foo1bar').toEqual(result[0]);
        expect('foo2bar').toEqual(result[1]);
        expect('foo3bar').toEqual(result[2]);
    });

    //foo[1-3]bar[5-7]
    it('should create multiple metrics from a multiple number ranges.', function(){
      var buildTarget = 'foo[1-3]bar[5-7]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect('foo1bar5').toEqual(result[0]);
        expect('foo1bar6').toEqual(result[1]);
        expect('foo1bar7').toEqual(result[2]);
        expect('foo2bar5').toEqual(result[3]);
        expect('foo2bar6').toEqual(result[4]);
        expect('foo2bar7').toEqual(result[5]);
        expect('foo3bar5').toEqual(result[6]);
        expect('foo3bar6').toEqual(result[7]);
        expect('foo3bar7').toEqual(result[8]);
    });

    it('should create multiple metrics from a multiple number ranges with periods between ranges.', function(){
      var buildTarget = 'foo.[1-3].bar.[5-7]',
        result = graphiteTargetBuilder.build(buildTarget);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(9);
      expect('foo.1.bar.5').toEqual(result[0]);
      expect('foo.1.bar.6').toEqual(result[1]);
      expect('foo.1.bar.7').toEqual(result[2]);
      expect('foo.2.bar.5').toEqual(result[3]);
      expect('foo.2.bar.6').toEqual(result[4]);
      expect('foo.2.bar.7').toEqual(result[5]);
      expect('foo.3.bar.5').toEqual(result[6]);
      expect('foo.3.bar.6').toEqual(result[7]);
      expect('foo.3.bar.7').toEqual(result[8]);
    });

    xit('should create multiple metrics from three number ranges.', function(){
      var buildTarget = 'foo.[1-3].bar.[5-7].ing.[8-9]',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(18);

        expect('foo.1.bar.5.ing.8').toEqual(result[0]);
        expect('foo.1.bar.5.ing.9').toEqual(result[1]);
        expect('foo.1.bar.6.ing.8').toEqual(result[2]);
        expect('foo.1.bar.6.ing.9').toEqual(result[3]);
        expect('foo.1.bar.7.ing.8').toEqual(result[4]);
        expect('foo.1.bar.7.ing.9').toEqual(result[5]);
        expect('foo.2.bar.5.ing.8').toEqual(result[6]);
        expect('foo.2.bar.5.ing.9').toEqual(result[7]);
        expect('foo.2.bar.6.ing.8').toEqual(result[8]);
        expect('foo.2.bar.6.ing.9').toEqual(result[9]);
        expect('foo.2.bar.7.ing.8').toEqual(result[10]);
        expect('foo.2.bar.7.ing.9').toEqual(result[11]);
        expect('foo.3.bar.5.ing.8').toEqual(result[12]);
        expect('foo.3.bar.5.ing.9').toEqual(result[13]);
        expect('foo.3.bar.6.ing.8').toEqual(result[14]);
        expect('foo.3.bar.6.ing.9').toEqual(result[15]);
        expect('foo.3.bar.7.ing.8').toEqual(result[16]);
        expect('foo.3.bar.7.ing.9').toEqual(result[17]);
    });
  });

  describe('Value List ', function(){
    var graphiteTargetBuilder;
    beforeEach(module('ngGraphite.factories'));
    beforeEach(inject(function(GraphiteTargetBuilder){
      graphiteTargetBuilder = GraphiteTargetBuilder;
    }));

    it('should create a multiple metrics from a value list.', function(){
      var buildTarget = 'foobar.{one,two,three}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(3);
        expect('foobar.one').toEqual(result[0]);
        expect('foobar.two').toEqual(result[1]);
        expect('foobar.three').toEqual(result[2]);
    });

    it('should create a multiple metrics from multiple value lists.', function(){
      var buildTarget = 'foobar.{one,two,three}.{five,six,seven}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect('foobar.one.five').toEqual(result[0]);
        expect('foobar.one.six').toEqual(result[1]);
        expect('foobar.one.seven').toEqual(result[2]);
        expect('foobar.two.five').toEqual(result[3]);
        expect('foobar.two.six').toEqual(result[4]);
        expect('foobar.two.seven').toEqual(result[5]);
        expect('foobar.three.five').toEqual(result[6]);
        expect('foobar.three.six').toEqual(result[7]);
        expect('foobar.three.seven').toEqual(result[8]);
    });

    it('should create a multiple metrics from multiple value lists.', function(){
      var buildTarget = 'foobar.{one,two,three}{five,six,seven}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(9);
        expect('foobar.onefive').toEqual(result[0]);
        expect('foobar.onesix').toEqual(result[1]);
        expect('foobar.oneseven').toEqual(result[2]);
        expect('foobar.twofive').toEqual(result[3]);
        expect('foobar.twosix').toEqual(result[4]);
        expect('foobar.twoseven').toEqual(result[5]);
        expect('foobar.threefive').toEqual(result[6]);
        expect('foobar.threesix').toEqual(result[7]);
        expect('foobar.threeseven').toEqual(result[8]);
    });

    xit('should create a multiple metrics from three value lists.', function(){
      var buildTarget = 'foobar.{one,two}.bar.{three,four}.ing.{five,six}',
        result = graphiteTargetBuilder.build(buildTarget);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(8);
        expect('foobar.one.bar.three.ing.five').toEqual(result[0]);
        expect('foobar.one.bar.three.ing.six').toEqual(result[1]);
        expect('foobar.one.bar.four.ing.five').toEqual(result[2]);
        expect('foobar.one.bar.four.ing.six').toEqual(result[3]);
        expect('foobar.two.bar.three.ing.five').toEqual(result[4]);
        expect('foobar.two.bar.three.ing.six').toEqual(result[5]);
        expect('foobar.two.bar.four.ing.five').toEqual(result[6]);
        expect('foobar.two.bar.four.ing.six').toEqual(result[7]);
    });

  });

});

