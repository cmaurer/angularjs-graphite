/*! angularjs-graphite - v0.0.0 - 2014-04-08
 * Copyright (c) 2014 ; Licensed Apache License, v2.0 */
window.ngGraphite = {};
window.ngGraphite.i18n = {};
var ngGraphiteProviders = angular.module( 'ngGraphite.providers', [] ),
  ngGraphiteFactories = angular.module( 'ngGraphite.factories', [] ),
  ngGraphiteServices = angular.module( 'ngGraphite.services', [] );
//var ngGraphiteDirectives = angular.module('ngGraphite.directives', []);
//var ngGraphiteFilters = angular.module('ngGraphite.filters', []);
angular.module( 'ngGraphite', [
  'ngGraphite.providers',
  'ngGraphite.factories',
  'ngGraphite.services'
] ); //, 'ngGraphite.directives', 'ngGraphite.filters'

var TIME_FORMAT_REGEX = {
  relativeTimeRegEx: /(now|\-\d.[s]?[mion]?[w]?[mon]?[d]?[y]?)/,
  hhMmYyMmDdRegEx: /(([012][0-9])\:([0-5][0-9])\_([0-3][0-9])([0-1][0-9])([1-3][0-9]))/,
  yyyyMmDdRegEx: /(([2][01][012][0-9])([01][0-9])([01][0-9]))/,
  mmDdYyRegEx: /(([01][0-9]))\/([0-3][0-9])\/([0123][0-9])/
};
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
var Parser = function ( options ) {
  'use strict';
  this.options = options;
};
Parser.prototype = {
  constructor: Parser,
  parse: function ( value ) {
    'use strict';
    if ( TIME_FORMAT_REGEX.relativeTimeRegEx.test( value ) ) {
      return this.parseRelativeTime( value );
    } else {
      return this.parseAbsoluteTime( value );
    }
  },
  parseRelativeTime: function ( value ) {
    'use strict';
    return 0;
  },
  parseAbsoluteTime: function ( value ) {
    'use strict';
    return 0;
  }
};
/**
 * @ngdoc
 * @name ngGraphite.services.GraphiteDateParser
 */
ngGraphiteServices.factory( 'GraphiteDateParser', function () {
  'use strict';
  return new Parser( {} );
} );
/**
 * @ngdoc provider
 */
ngGraphiteProviders.provider( 'Graphite', function () {
  'use strict';
  var defaultMethod = 'GET';
  this.setDefaultMethod = function ( method ) {
    defaultMethod = method;
  };
  var defaultProtocol = 'http';
  this.setDefaultProtocol = function ( protocol ) {
    defaultProtocol = protocol;
  };
  var defaultHost = 'localhost';
  this.setDefaultHost = function ( host ) {
    defaultHost = host;
  };
  var defaultPort = 80;
  this.setDefaultPort = function ( port ) {
    defaultPort = port;
  };
  var defaultFormat = 'json';
  this.setDefaultFormat = function ( format ) {
    defaultFormat = format;
  };
  var defaultPath = '/render';
  this.setDefaultPath = function ( path ) {
    defaultPath = path;
  };
  var defaultFrom = '-24h';
  this.setDefaultFrom = function ( from ) {
    defaultFrom = from;
  };
  var defaultUntil = 'now';
  this.setDefaultUntil = function ( until ) {
    defaultUntil = until;
  };
  this.buildUrl = function ( path, targets, from, until ) {
    if ( !path ) {
      path = defaultPath;
    }
    if ( !from ) {
      from = defaultFrom;
    }
    if ( !until ) {
      until = defaultUntil;
    }
    var urlStr = defaultProtocol + '://' + defaultHost + ':' + defaultPort + path + '?format=' + defaultFormat + '&from=' + from + '&until=' + until;
    if ( targets ) {
      targets.forEach( function ( target ) {
        urlStr = urlStr + '&target=' + target;
      } );
    }
    return urlStr;
  };
  this.$get = function () {
    return {
      buildUrl: function ( path, targets, from, until ) {
        if ( !path ) {
          path = defaultPath;
        }
        if ( !from ) {
          from = defaultFrom;
        }
        if ( !until ) {
          until = defaultUntil;
        }
        var urlStr = defaultProtocol + '://' + defaultHost + ':' + defaultPort + path + '?format=' + defaultFormat + '&from=' + from + '&until=' + until;
        if ( targets ) {
          targets.forEach( function ( target ) {
            urlStr = urlStr + '&target=' + target;
          } );
        }
        return urlStr;
      }
    };
  };
} );
ngGraphiteFactories.factory( 'GraphiteDataParser', function () {
  'use strict';
  return {
    rawToJson: function ( rawData ) {
      var response = [],
        splitLine, jsonObj, metaData, startTimestamp, endTimestamp, seriesStep;
      rawData.split( /\n/g ).forEach( function ( rawDataLine ) {
        if ( rawDataLine ) {
          jsonObj = {
            'target': '',
            'datapoints': []
          };
          splitLine = rawDataLine.split( /\|/ );
          metaData = splitLine[ 0 ].split( /\,/ );
          jsonObj.target = metaData[ 0 ];
          startTimestamp = +metaData[ 1 ];
          endTimestamp = +metaData[ 2 ];
          seriesStep = +metaData[ 3 ];
          splitLine[ 1 ].split( /\,/ ).forEach( function ( data ) {
            jsonObj.datapoints.push( [
              data,
              startTimestamp
            ] );
            startTimestamp = startTimestamp + seriesStep;
          } );
          response.push( jsonObj );
        }
      } );
      return response;
    },
    jsonToRaw: function ( jsonData ) {
      var raw = '';
      return raw;
    }
  };
} );
ngGraphiteFactories.factory( 'GraphiteTargetBuilder', function () {
  'use strict';
  var allPatternsRegex = /(\[[0-9a-zA-Z]*\])|(\[([a-zA-Z]*\-[a-zA-z]*)?([0-9]*\-[0-9]*)?\])|\{([\w\d\,]*)\}/g,
    characterListRegex = /(\[[0-9a-zA-Z]*\])/g,
    characterRangeRegex = /(\[([a-zA-Z]*\-[a-zA-Z]*)?([0-9]*\-[0-9]*)?\])/g,
    valueListRegex = /\{([\w\d\,]*)\}/g,
    alpha = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ],
    ALPHA = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];

  function buildResult( value, strs ) {
    var rslts = [],
      filteredResults = [];
    strs.forEach( function ( str, strsIdx ) {
      str.values.map( function ( d ) {
        if ( strsIdx === 0 ) {
          rslts.push( value.replace( str.pattern, d ) );
        } else {
          rslts.map( function ( rslt ) {
            return rslt.replace( str.pattern, d );
          } ).forEach( function ( r ) {
            rslts.push( r );
          } );
        }
      } );
    } );
    var patterns = strs.map( function ( d ) {
      return d.pattern;
    } );
    patterns.forEach( function ( p ) {
      rslts = rslts.filter( function ( d ) {
        return d.indexOf( p ) === -1;
      } );
    } );
    rslts.forEach( function ( d ) {
      if ( filteredResults.indexOf( d ) === -1 ) {
        filteredResults.push( d );
      }
    } );
    return filteredResults;
  }

  function buildValueList( value ) {
    var strs = [];
    value.match( valueListRegex ).forEach( function ( match ) {
      strs.push( {
        values: match.replace( '{', '' ).replace( '}', '' ).split( ',' ),
        str: value,
        pattern: match
      } );
    } );
    return strs;
  }

  function buildCharacterRange( value ) {
    //find start and end position of all brackets '[]' in value
    var strs = [],
      nums;
    value.match( characterRangeRegex ).forEach( function ( match ) {
      var range = match.replace( '[', '' ).replace( ']', '' ).split( '-' );
      if ( isNaN( range[ 0 ] ) ) {
        //characters
        if ( alpha.indexOf( range[ 0 ] ) > -1 ) {
          strs.push( {
            values: alpha.slice( alpha.indexOf( range[ 0 ] ), alpha.indexOf( range[ 1 ] ) + 1 ),
            str: value,
            pattern: match
          } );
        } else {
          strs.push( {
            values: ALPHA.slice( ALPHA.indexOf( range[ 0 ] ), ALPHA.indexOf( range[ 1 ] ) + 1 ),
            str: value,
            pattern: match
          } );
        }
      } else {
        //numbers
        nums = [];
        for ( var i = +range[ 0 ]; i < +range[ 1 ] + 1; i++ ) {
          nums.push( i );
        }
        strs.push( {
          values: nums,
          str: value,
          pattern: match
        } );
      }
    } );
    return strs;
  }

  function buildCharacterList( value ) {
    //find start and end position of all brackets '[]' in value
    var strs = [],
      range, vals = [];
    value.match( characterListRegex ).forEach( function ( match ) {
      range = match.replace( '[', '' ).replace( ']', '' );
      vals = [];
      for ( var i = 0; i < range.length; i++ ) {
        vals.push( range[ i ] );
      }
      strs.push( {
        values: vals,
        str: value,
        pattern: match
      } );
    } );
    return strs;
  }
  return {
    build: function ( value ) {
      var arr, strs = [],
        origValue = value.slice( 0 );

      function addToStrArray( str ) {
        strs.push( str );
      }
      while ( ( arr = allPatternsRegex.exec( value ) ) !== null ) {
        var token = arr[ 0 ].slice( 0 );
        if ( token.match( characterListRegex ) !== null ) {
          buildCharacterList( token ).forEach( addToStrArray );
        } else if ( token.match( characterRangeRegex ) !== null ) {
          buildCharacterRange( token ).forEach( addToStrArray );
        } else if ( token.match( valueListRegex ) !== null ) {
          buildValueList( token ).forEach( addToStrArray );
        } else {
          console.log( 'token not matched', token );
        }
      }
      return buildResult( origValue, strs );
    },
    buildAll: function ( values ) {
      return [];
    }
  };
} );
ngGraphiteServices.factory( 'GraphiteService', [
  '$q',
  function ( $q ) {
    'use strict';
    /**
     * @ngdoc method
     * @name GraphiteService#getAllMetricNamesBulk
     *
     * @description
     * Queries Graphite instance at ``/metrics/index.json`` and returns all of the metrics that
     * a configured Graphite instance exposes.
     *
     * This method can cause performance issues for the Graphite instance.
     * ``index.json`` returns all of the metrics with one request.
     *
     */
    var getAllMetricNamesBulk = function () {};
    /**
     * @ngdoc method
     * @name GraphiteService#findAllMetrics
     *
     * @description
     * Queries Graphite instance at the root node, and finds all of the metrics that a
     * the configured Graphite instance exposes.
     *
     */
    var findAllMetricNames = function () {};
    /**
     * @ngdoc method
     * @name GraphiteService#findMetricsAt
     * @param node
     *
     * @description
     * Queries Graphite instance and returns all the metrics at the specific node.
     *
     */
    var findMetricsAt = function ( node ) {};
    return {
      findAllMetricNames: findAllMetricNames,
      findMetricsAt: findMetricsAt,
      getAllMetricNamesBulk: getAllMetricNamesBulk
    };
  }
] );
