/*jslint plusplus: true */
/*jshint nomen: false */
//this function will search a word in a array.
var searchLocal = function (data, wordSearch) {
  "use strict";

  var
    wordList = [], //set a word lists to send a result.
    i = 0,
    word,
    json;

  while (i < data.length) {
    word = data[i];
    if (word.search(wordSearch) !== -1) {
      json = {name: data[i]};
      wordList.push(json);
    }
    i++;
  }

  return (wordList);
};


var searchIntroJson = function (dataUrl, root, keyList, wordSearch) {
  'use strict';

  var
    wordList = [],
    k,
    i = 0,
    word,
    json,
    x = 0,
    suggestionName = [],
    value,
    data = [];

  microAjax(dataUrl, function (json) {
    data = JSON.parse(json);

    if (root) {
      data = data[root];
    }

    while (i < data.length) {
      suggestionName = [];
      value = '';

      for (x = 0; x < keyList.length; x++) {
        k = keyList[x];
        suggestionName.push(data[i][k]);
      }

      value = suggestionName.join(' ');

      if (value.search(wordSearch) !== -1) {
        json = {
          name: value,
          originalData: data[i]
        };
        wordList.push(json);
      }

      i++;
    }
  });

  return (wordList);
};

var searchRemote = function (data, wordSearch, key, url, root) {
  "use strict";

  var
    i = 0,
    word,
    json,
    keyList,
    x = 0,
    k,
    suggestionName = [],
    value,
    data = [],
    dataUrl;

  keyList = key.split(',');

  dataUrl = url + wordSearch;

  if (wordSearch === '') {
    return (null);
  }
  var re = searchIntroJson(dataUrl, root, keyList, wordSearch);
  return (re);
};

var searchSuggestions = function (data, wordSearch, key, url, root){
  'use strict';

  if(url !== ''){
    return (searchRemote(data, wordSearch, key, url, root));
  }else{
    return (searchLocal(data, wordSearch));
  }
}
