
/**
 * @ngdoc factory
 * @name GraphiteTargetBuilder
 *
 */
ngGraphiteFactories
  .factory('GraphiteTargetBuilder', function () {
    'use strict';

    var allPatternsRegex = /(\[[0-9a-zA-Z]*\])|(\[([a-zA-Z]*\-[a-zA-z]*)?([0-9]*\-[0-9]*)?\])|\{(.*?)\}/g,
      characterListRegex =  /(\[[0-9a-zA-Z]*\])/g,
      characterRangeRegex = /(\[([a-zA-Z]*\-[a-zA-Z]*)?([0-9]*\-[0-9]*)?\])/g,
      valueListRegex = /\{(.*?)\}/g,
      alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      ALPHA = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    function buildResult(value, strs) {
      var rslts = [], filteredResults = [];
      strs.forEach(function(str, strsIdx){
        str.values.map(function(d){
          if(strsIdx === 0){
            rslts.push(value.replace(str.pattern, d));
          } else {
            rslts.map(function(rslt){
                return rslt.replace(str.pattern, d);
            }).forEach(function(r){
              rslts.push(r);
            });
          }
        });
      });

      var patterns = strs.map(function(d){ return d.pattern});
      patterns.forEach(function(p){
        rslts = rslts.filter(function(d){
          return (d.indexOf(p) === -1);
        });
      });
      rslts.forEach(function(d){
        if(filteredResults.indexOf(d) === -1){
          filteredResults.push(d);
        }
      });
      return filteredResults;
    }

    /**
     *
     * Value List
     *
     * @param value
     * @returns {Array}
     */
    function buildValueList(value){
      var strs = [];
      value.match(valueListRegex).forEach(function(match){
        strs.push({values: match.replace('{', '').replace('}', '').split(','), str: value, pattern: match});
      });
      return strs;
    }

    function buildCharacterRange(value){
      //find start and end position of all brackets '[]' in value
      var strs = [], nums;
      value.match(characterRangeRegex).forEach(function(match){
        var range = match.replace('[', '').replace(']', '').split('-');
        if(isNaN(range[0])){
          //characters
          if(alpha.indexOf(range[0]) > -1){
            strs.push({values: alpha.slice(alpha.indexOf(range[0]), alpha.indexOf(range[1]) + 1), str: value, pattern: match});
          } else {
            strs.push({values: ALPHA.slice(ALPHA.indexOf(range[0]), ALPHA.indexOf(range[1]) + 1), str: value, pattern: match});
          }
        } else {
          //numbers
          nums = [];
          for(var i = +range[0]; i < (+range[1] + 1); i++){
            nums.push(i);
          }
          strs.push({values: nums, str: value, pattern: match});
        }
      });
      return strs;
    }

     function buildCharacterList(value){
      //find start and end position of all brackets '[]' in value
      var strs = [], range, vals = [];
      value.match(characterListRegex).forEach(function(match){
        range = match.replace('[', '').replace(']', '');
        vals = [];
        for(var i=0;i<range.length;i++){
          vals.push(range[i]);
        }
        strs.push({values: vals, str: value, pattern: match});
      });
      return strs;
    }

    return {
      build: function(value){
        var arr, strs = [], origValue = value.slice(0);

        function addToStrArray(str){
          strs.push(str);
        }

        while ((arr = allPatternsRegex.exec(value)) !== null) {
          var token = arr[0].slice(0);
          if (token.match(characterListRegex) !== null) {
            buildCharacterList(token).forEach(addToStrArray);
          } else if (token.match(characterRangeRegex) !== null) {
            buildCharacterRange(token).forEach(addToStrArray);
          } else if (token.match(valueListRegex) !== null) {
            buildValueList(token).forEach(addToStrArray);
          } else {
            console.log('token not matched', token);
          }
        }

        return buildResult(origValue, strs);
      },
      buildAll: function(values){
        return [];
      }

    };
  });
