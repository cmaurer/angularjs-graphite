var TIME_FORMAT_REGEX = {
  relativeTimeRegEx: /(now|\-\d.[s]?[mion]?[w]?[mon]?[d]?[y]?)/,
  hhMmYyMmDdRegEx: /(([012][0-9])\:([0-5][0-9])\_([0-3][0-9])([0-1][0-9])([1-3][0-9]))/,
  yyyyMmDdRegEx: /(([2][01][012][0-9])([01][0-9])([01][0-9]))/,
  mmDdYyRegEx: /(([01][0-9]))\/([0-3][0-9])\/([0123][0-9])/
}

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
};


Parser.prototype = {

  constructor: Parser,
  parse: function(value){
    'use strict';
    if(TIME_FORMAT_REGEX.relativeTimeRegEx.test(value)){
      return this.parseRelativeTime(value);
    } else {
      return this.parseAbsoluteTime(value);
    }
  },
  parseRelativeTime: function(value){
    'use strict';
    return 0;
  },
  parseAbsoluteTime: function(value){
    'use strict';
    return 0;
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
