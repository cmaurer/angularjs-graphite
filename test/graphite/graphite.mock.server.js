'use strict';
var moment = require('moment'),
  config = [],
  yearsRegex = /(\-)([0-9]*)(y[ear]*?s?)/,
  monthsRegex = /(\-)([0-9]*)(mo[nth]*?s?)/,
  daysRegex = /(\-)([0-9]*)(d[ay]*?s?)/,
  hoursRegex = /(\-)([0-9]*)(h[our]*?s?)/,
  minutesRegex = /(\-)([0-9]*)(mi[nute]*?s?)/,
  secondsRegex = /(\-)([0-9]*)(s[econd]*?s?)/;

var parseQueryDate = function(dte, callback){
  var response = [];
  if(!Array.isArray(dte)){
    dte = [dte];
  }
  dte.forEach(function(dt){
    if(yearsRegex.test(dt)){
      response.push(moment().subtract('years', +yearsRegex.exec(dt)[2]));
    } else if(monthsRegex.test(dt)){
      response.push(moment().subtract('months', +monthsRegex.exec(dt)[2]));
    } else if(daysRegex.test(dt)){
      response.push(moment().subtract('days', +daysRegex.exec(dt)[2]));
    } else if(hoursRegex.test(dt)){
      response.push(moment().subtract('hours', +hoursRegex.exec(dt)[2]));
    } else if(minutesRegex.test(dt)){
      response.push(moment().subtract('minutes', +minutesRegex.exec(dt)[2]));
    } else if(secondsRegex.test(dt)){
      response.push(moment().subtract('seconds', +secondsRegex.exec(dt)[2]));
    } else {
      return callback(new Error('could not parse date ' + dt));
    }
  });
  return callback(null, response);
};

var createDatapoints = function(from, until, step, max, min, deviate, callback){
  var datapoints = [];
  while(from.isBefore(until)){
    datapoints.push([Math.round((Math.random() * (max - min) + min)), from.seconds(step).unix()]);
    from.add('seconds', +step);
  }
  return callback(null, datapoints);
};

var spikeDatapoints = function(max, datapoints, callback){
  //make all datapoints below maximum
  datapoints.forEach(function(dp){
    return dp[0] = (max - (Math.random() * max));
  });
  //spike the last datapoint
  datapoints[datapoints.length - 1][0] = (Math.random() * max) + max;
  return callback(null, datapoints);
};

var dropDatapoints = function(min, datapoints, callback){
  //make all datapoints above minimum
  datapoints.forEach(function(dp){
    return dp[0] = (min + (Math.random() * min));
  });
  datapoints[datapoints.length - 1][0] = (min - (Math.random()));
  return callback(null, datapoints);
};

var driftDatapoints = function(datapoints, callback){

  return callback(null, datapoints);
};

var pegDatapoints = function(max, datapoints, callback){
  datapoints.forEach(function(dp){
    return dp[0] = (Math.random() * max) + max;
  });
  return callback(null, datapoints);
};

var setDatapoints = function(constant, datapoints, callback){
  return callback(null, datapoints);
};

var zeroDatapoints = function(datapoints, callback){
  datapoints.forEach(function(dp){
    return dp[0] = 0;
  });
  return callback(null, datapoints);
};

var clear = function(target){
  config[config.map(function(d){return d.target;}).indexOf(target)].deviation = undefined;
};

var processDeviation = function(deviation, target, min, max, datapoints, callback){

  switch(deviation){

    case 'spike':
      spikeDatapoints(max, datapoints, function(err, datapoints){
        return callback(err, datapoints);
      });
      break;

    case 'drop':
      dropDatapoints(min, datapoints, function(err, datapoints){
        return callback(err, datapoints);
      });
      break;

    case 'drift':
      driftDatapoints(datapoints, function(err, datapoints){
        return callback(err, datapoints);
      });
      break;

    case 'peg':
      pegDatapoints(max, datapoints, function(err, datapoints){
        return callback(err, datapoints);
      });
      break;

    case 'set':
      setDatapoints(datapoints, function(err, datapoints){
        return callback(err, datapoints);
      });
      break;

    case 'zero':
      zeroDatapoints(datapoints, function(err, datapoints){
        return callback(err, datapoints);
      });
      break;

    case 'clear':
      clear(target);
      break;

  }

};

/**
 * @param target
 * @param format
 * @param from
 * @param until
 * @returns Graphite response with datapoints
 */
module.exports.render = function(request, callback){
  //from, until, datapoints
  var resp = [],
    target = request.query.target,
    cfgIndex = config.map(function(d){return d.target;}).indexOf(target),
    cfg = {};
  if(cfgIndex > -1){
    cfg = config[cfgIndex];
  }
  var min = (cfg.min !== undefined ? +cfg.min : 0),
    max = (cfg.max !== undefined ? +cfg.max: 1),
    step = (cfg.step !== undefined ? +cfg.step : 30),
    deviation = cfg.deviation,
    from, until;
    parseQueryDate([request.query.from, request.query.until], function(err, result){
      from = result[0];
      until = result[1];
      createDatapoints(from, until, step, max, min, deviation, function(err, datapoints){
        if(err){
          callback(err);
        }
        if(deviation){
          processDeviation(deviation, target, min, max, datapoints, function(err, datapoints){
            resp.push({target: target, datapoints: datapoints});
            callback(null, resp);
          });
        } else {
          resp.push({target: target, datapoints: datapoints});
          callback(null, resp);
        }
      });
    });
};

/**
 * @param target  graphite target to match on render call
 * @param format  json, csv, raw
 * @param step  how many seconds between datapoints
 * @param max maximum for the datapoints
 * @param min minimum for the datapoints
 * @param deviation obj describing the deviation that the metric should exhibit (spike, drop, peg, zero, drift, set, clear, ...)
 */
module.exports.config = function(request, response){
  var target = request.query.target,
    cfg = config.map(function(d){ return d.target; }).indexOf(target),
    idx = -1;
  if(cfg > -1){
    idx = config.reduceRight(
      function(p, c, i, arr){
        if(arr[i].target === target){
          return i;
        } else {
          return p + 0;
        }
      }, 0
    );
    config.splice(idx, 1, request.query);
  } else {
    if(request.query){
      config.push(request.query);
    }
  }
  return response.send(200, config);
};
