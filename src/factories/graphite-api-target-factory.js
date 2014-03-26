
/**
 * @ngdoc factory
 * @name GraphiteTargetBuilder
 *
 */
ngGraphiteFactories
  .factory('GraphiteTargetBuilder', function () {
    'use strict';

    var characterListRegex =  /(\[[0-9a-zA-Z]*\])/g,
      characterRangeRegex = /(\[([a-z]*\-[a-z]*)?([A-Z]*\-[A-Z]*)?([0-9]*\-[0-9]*)?\])/g,
      valueListRegex = /\{([\w\d\,]*)\}/g,
      alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      ALPHA = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    function buildResult(strs) {
      var first = strs.shift(), rslt = [];
      first.values.forEach(function (d) {
        var strr = first.str.replace(first.pattern, d);
        if (strs.length > 0) {
          strs.forEach(function (dd) {
            dd.values.forEach(function (ddd) {
              rslt.push(strr.replace(dd.pattern, ddd));
            });
          })
        } else {
          rslt.push(strr);
        }
      });
      return rslt;
    }

    return {

      buildValueList: function(value){
        //find start and end position of all brackets '[]' in value
        //find start and end position of all brackets '{}'
        var strs = [];
        value.match(valueListRegex).forEach(function(match, idx){
          strs.push({index: idx, values: match.replace('{', '').replace('}', '').split(','), str: value, pattern: match});
        });
        return buildResult(strs);
      },
      buildCharacterRange: function(value){
        //find start and end position of all brackets '[]' in value
        var strs = [], nums;
        value.match(characterRangeRegex).forEach(function(match, idx){
          var range = match.replace('[', '').replace(']', '').split('-');
          if(isNaN(range[0])){
            //characters
            if(alpha.indexOf(range[0]) > -1){
              strs.push({index: idx, values: alpha.slice(alpha.indexOf(range[0]), alpha.indexOf(range[1]) + 1), str: value, pattern: match});
            } else {
              strs.push({index: idx, values: ALPHA.slice(ALPHA.indexOf(range[0]), ALPHA.indexOf(range[1]) + 1), str: value, pattern: match});
            }
          } else {
            //numbers
            nums = [];
            for(var i = +range[0]; i < (+range[1] + 1); i++){
              nums.push(i);
            }
            strs.push({index: idx, values: nums, str: value, pattern: match});
          }
        });
        return buildResult(strs);
      },
      buildCharacterList: function(value){
        //find start and end position of all brackets '[]' in value
        var strs = [];
        value.match(characterListRegex).forEach(function(match, idx){
          var range = match.replace('[', '').replace(']', ''), vals = [];
          for(var i=0;i<range.length;i++){
            vals.push(range[i]);
          }
          strs.push({index: idx, values: vals, str: value, pattern: match});
        });
        return buildResult(strs);
      },
      build: function(value){
        if (characterListRegex.test(value)) {
          return this.buildCharacterList(value);
        }
        if (characterRangeRegex.test(value)) {
          return this.buildCharacterRange(value);
        }
        if (valueListRegex.test(value)) {
          return this.buildValueList(value);
        }
        return []; //return empty array if nothing is matched.
      }

    };
  });
