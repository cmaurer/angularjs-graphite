/**
 * @ngdoc
 * @name Parser
 *
 * Relative Time
 *
 * RELATIVE_TIME is a length of time since the current time. It is always preceded my a minus sign ( - ) and follow by a unit of time. Valid units of time:
 * s	Seconds
 * min	Minutes
 * h	Hours
 * d	Days
 * w	Weeks
 * mon	30 Days (month)
 * y	365 Days (year)
 *
 * Absolute Time
 * ABSOLUTE_TIME is in the format HH:MM_YYMMDD, YYYYMMDD, MM/DD/YY, or any other at(1)-compatible time format.
 * HH	Hours, in 24h clock format. Times before 12PM must include leading zeroes.
 * MM	Minutes
 * YYYY	4 Digit Year.
 * MM	Numeric month representation with leading zero
 * DD	Day of month with leading zero
 *
 */
var Parser = function(options) {
  'use strict';
  this.options = options;
  this.relativeTimeRegEx = /((\-)([0-9]*)(s|min|h|d|w|mon|y))/;
  this.secondRegEx = /(s)/;
  this.minuteRegEx = /(m[in])/;
  this.hourRegEx = /(h)/;
  this.dayRegEx = /(d)/;
  this.weekRegEx = /(w)/;
  this.monthRegEx = /(m[on])/;
  this.yearRegEx = /(y)/;
  this.relativeTimeNowRegEx = /(now)/;
  this.hhMmYyMmDdRegEx = /(([012][0-9])\:([0-5][0-9])\_([0-3][0-9])([0-1][0-9])([0-3][0-9]))/;
  this.yyyyMmDdRegEx = /(([2][01][012][0-9])([01][0-9])([01][0-9]))/;
  this.mmDdYyRegEx = /([01][0-9])\/([0-3][0-9])\/([0123][0-9])/;
};

Parser.prototype = {
  constructor: Parser,
  parse: function(value){
    'use strict';
    if(this.relativeTimeRegEx.test(value)) {
      return this.parseRelativeTime(value);
    } else if (this.relativeTimeNowRegEx.test(value)) {
      return new Date();
    } else {
      return this.parseAbsoluteTime(value);
    }
  },
  /**
   * expect ['-30s', '-30s', '-', '30', 's']
   * arr      0       1       2   3     4
   * Date: time in milliseconds
   *      1000 ms in s
   *     60000 ms in m
   *   3600000 ms in h
   *  86400000 ms in d
   * 604800000 ms in w
   * 2.62974e9 ms in month
   * 3.15569e10 ms in year
   * @param value
   * @returns {number}
   */
  parseRelativeTime: function(value){
    'use strict';
    var arr = this.relativeTimeRegEx.exec(value),
      timeLength, timeUnit, now = new Date();
    if(arr !== null) {
      timeLength = +arr[3];
      timeUnit = arr[4];
      if(this.secondRegEx.test(timeUnit)) {
        return new Date(now.getTime() - (timeLength * 1000));
      } else if (this.minuteRegEx.test(timeUnit)) {
        return new Date(now.getTime() - (timeLength * 60000));
      } else if (this.hourRegEx.test(timeUnit)) {
        return new Date(now.getTime() - (timeLength * 3600000));
      } else if (this.dayRegEx.test(timeUnit)) {
        return new Date(now.getTime() - (timeLength * 86400000));
      } else if (this.weekRegEx.test(timeUnit)) {
        return new Date(now.getTime() - (timeLength * 604800000));
      } else if (this.monthRegEx.test(timeUnit)) {
        return new Date(now.getTime() - (timeLength * 2.62974e9));
      } else if (this.yearRegEx.test(timeUnit)) {
        return new Date(now.getTime() - (timeLength * 3.15569e10));
      }
    }
    return now;
  },
  parseAbsoluteTime: function(value){
    'use strict';
    //try known formats
    //try javascript default format last
    var arr, now = new Date();
    if(this.hhMmYyMmDdRegEx.test(value)) {
      // ['20:00_140102', '20:00_140102', '20', '00', '14', '01', '02']
      //          0             1           2     3    4     5     6
      //                                  Hour Month  Year  Mnth  Day
      //new Date(year, month, day, hour, minute, second, millisecond)
      arr = this.hhMmYyMmDdRegEx.exec(value);
      //this will never cause a bug!! :)
      return new Date(+(2000 + (+arr[4])), (+arr[5] - 1), +arr[6], +arr[2], 0, 0, 0);
    } else if (this.yyyyMmDdRegEx.test(value)){

    } else if (this.mmDdYyRegEx.test(value)){

    }
    return now;
  }

};

/**
 * @ngdoc
 * @name ngGraphite.services.GraphiteDateParser
 */
ngGraphiteServices
.factory('GraphiteDateParser', function(){
    'use strict';
  return new Parser({});
});
