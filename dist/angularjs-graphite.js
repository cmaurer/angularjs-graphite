/*! angularjs-graphite - v0.0.0 - 2014-05-06
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
  var allPatternsRegex = /(\[[0-9a-zA-Z]*\])|(\[[a-z0-9A-Z].*?\])|\{(.*?)\}/g,
    characterListRegex = /(\[[0-9a-zA-Z]*\])/g,
    characterRangeRegex = /(\[[0-9a-zA-Z].*?\])/g,
    valueListRegex = /\{(.*?)\}/g,
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
  /**
   *
   * Value List
   *
   * @param value
   * @returns {Array}
   */
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

  function buildRange( value, match, range, strs ) {
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
      var nums = [];
      for ( var i = +range[ 0 ]; i < +range[ 1 ] + 1; i++ ) {
        nums.push( i );
      }
      strs.push( {
        values: nums,
        str: value,
        pattern: match
      } );
    }
  }

  function buildCharacterRange( value ) {
    //find start and end position of all brackets '[]' in value
    var strs = [];
    value.match( characterRangeRegex ).forEach( function ( match ) {
      if ( match.indexOf( ',' ) > -1 ) {
        match.replace( '[', '' ).replace( ']', '' ).split( ',' ).forEach( function ( rge ) {
          buildRange( value, match, rge.split( '-' ), strs );
        } );
      } else {
        var range = match.replace( '[', '' ).replace( ']', '' ).split( '-' );
        buildRange( value, match, range, strs );
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
        }
      }
      if ( strs.length === 0 ) {
        return [ value ];
      } else {
        return buildResult( origValue, strs );
      }
    },
    buildAll: function ( values ) {
      return [];
    }
  };
} );
var Parser = function ( options ) {
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
  parse: function ( value ) {
    'use strict';
    if ( this.relativeTimeRegEx.test( value ) ) {
      return this.parseRelativeTime( value );
    } else if ( this.relativeTimeNowRegEx.test( value ) ) {
      return new Date();
    } else if ( this.ISO_8601.test( value ) ) {
      return this.parseAbsoluteTime( value );
    } else {
      return this.parseAbsoluteTime( value );
    }
  },
  parseRelativeTime: function ( value ) {
    'use strict';
    var arr = this.relativeTimeRegEx.exec( value ),
      timeLength, timeUnit, now = new Date();
    if ( arr !== null ) {
      timeLength = +arr[ 3 ];
      timeUnit = arr[ 4 ];
      if ( this.secondRegEx.test( timeUnit ) ) {
        return new Date( now.getTime() - timeLength * 1000 );
      } else if ( this.minuteRegEx.test( timeUnit ) ) {
        return new Date( now.getTime() - timeLength * 60000 );
      } else if ( this.hourRegEx.test( timeUnit ) ) {
        return new Date( now.getTime() - timeLength * 3600000 );
      } else if ( this.dayRegEx.test( timeUnit ) ) {
        return new Date( now.getTime() - timeLength * 86400000 );
      } else if ( this.weekRegEx.test( timeUnit ) ) {
        return new Date( now.getTime() - timeLength * 604800000 );
      } else if ( this.monthRegEx.test( timeUnit ) ) {
        return new Date( now.getTime() - timeLength * 2629740000 );
      } else if ( this.yearRegEx.test( timeUnit ) ) {
        return new Date( now.getTime() - timeLength * 31556900000 );
      }
    }
    return now;
  },
  parseAbsoluteTime: function ( value ) {
    'use strict';
    //try known formats
    //try javascript default format last
    var arr, now = new Date();
    if ( this.hhMmYyMmDdRegEx.test( value ) ) {
      //HH:MM_YYmmDD
      arr = this.hhMmYyMmDdRegEx.exec( value );
      //this will never cause a bug!! :)
      return new Date( +arr[ 4 ] + 2000, +arr[ 5 ] - 1, +arr[ 6 ], +arr[ 2 ], 0, 0, 0 );
    } else if ( this.yyyyMmDdRegEx.test( value ) ) {
      //YYYYMMDD
      arr = this.yyyyMmDdRegEx.exec( value );
      return new Date( +arr[ 2 ], +arr[ 3 ] - 1, +arr[ 4 ], 0, 0, 0, 0 );
    } else if ( this.mmDdYyRegEx.test( value ) ) {
      //MM/DD/YY
      arr = this.mmDdYyRegEx.exec( value );
      return new Date( +arr[ 3 ] + 2000, +arr[ 1 ] - 1, +arr[ 2 ], 0, 0, 0, 0 );
    } else if ( this.ISO_8601.test( value ) ) {
      //YYYY-MM-DD HH:MM:SS
      arr = this.ISO_8601.exec( value );
      console.log( 'ISO_8601', arr, new Date( +arr[ 2 ], +arr[ 3 ] - 1, +arr[ 4 ], +arr[ 6 ], +arr[ 7 ], +arr[ 9 ], 0 ) );
      //['2014-01-02 20:21:22', '2014-01-02', '2014', '01', '02', '20:21:22', '20', '21', ':22', '22', undefined]
      //        0                   1           2       3     4       5         6     7     8     9     10
      //new Date(year, month, day, hour, minute, second, millisecond);
      return new Date( +arr[ 2 ], +arr[ 3 ] - 1, +arr[ 4 ], +arr[ 6 ], +arr[ 7 ], +arr[ 9 ], 0 );
    }
    return now;
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
