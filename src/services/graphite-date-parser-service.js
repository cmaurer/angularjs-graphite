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
 *
 * w3
 * http://www.w3.org/TR/NOTE-datetime
 *   Year:
 *     YYYY (eg 1997)
 *    Year and month:
 *     YYYY-MM (eg 1997-07)
 *    Complete date:
 *     YYYY-MM-DD (eg 1997-07-16)
 *    Complete date plus hours and minutes:
 *     YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)
 *    Complete date plus hours, minutes and seconds:
 *     YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+01:00)
 *    Complete date plus hours, minutes, seconds and a decimal fraction of a
 *    second
 *     YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)
 *
 *   where:
 *    YYYY = four-digit year
 *    MM   = two-digit month (01=January, etc.)
 *    DD   = two-digit day of month (01 through 31)
 *    hh   = two digits of hour (00 through 23) (am/pm NOT allowed)
 *    mm   = two digits of minute (00 through 59)
 *    ss   = two digits of second (00 through 59)
 *    s    = one or more digits representing a decimal fraction of a second
 *    TZD  = time zone designator (Z or +hh:mm or -hh:mm)
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
  this.ISO_8601 = /^\s*((20[0-9]{2})\W([0]?[0-9]|1[012])\W([012]?[0-9]|3[01]))?\s?(([01]?[0-9]|2[0-3])\W([0-5][0-9])(\W([0-5][0-9]))?(\s*[AaPp][Mm])?)?\s*$/;
};

Parser.prototype = {
  constructor: Parser,
  parse: function(value){
    'use strict';
    if(this.relativeTimeRegEx.test(value)) {
      return this.parseRelativeTime(value);
    } else if (this.relativeTimeNowRegEx.test(value)) {
      return new Date();
    } else if (this.ISO_8601.test(value)) {
      return this.parseAbsoluteTime(value);
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
      //HH:MM_YYmmDD
      arr = this.hhMmYyMmDdRegEx.exec(value);
      //this will never cause a bug!! :)
      return new Date((2000 + (arr[4])), (+arr[5] - 1), +arr[6], +arr[2], 0, 0, 0);
    } else if (this.yyyyMmDdRegEx.test(value)){
      //YYYYMMDD
      arr = this.yyyyMmDdRegEx.exec(value);
      return new Date(+arr[2], (+arr[3] - 1), +arr[4], 0, 0, 0, 0);
    } else if (this.mmDdYyRegEx.test(value)) {
      //MM/DD/YY
      arr = this.mmDdYyRegEx.exec(value);
      return new Date((2000 + (arr[3])), (+arr[1] - 1), +arr[2], 0, 0, 0, 0);
    } else if (this.ISO_8601.test(value)) {
      //YYYY-MM-DD HH:MM:SS
      arr = this.ISO_8601.exec(value);
      return new Date(+arr[2], (+arr[3] - 1), +arr[4], +arr[6], +arr[7], +arr[9], 0);
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
