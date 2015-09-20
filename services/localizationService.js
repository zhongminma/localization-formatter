/**
 * Created by Zhongmin Ma on 5/28/15.
 *
 * usage:
 *
 *   for example, your i18n key is 'homePage.title' and your market is US,
 *   then it will automatically read from /contents/language-us.js for the key value and return it.
 *
 *   var getTranslatedContent = require('/services/localizationService.js');
 *   var pageTitle = getTranslatedContent('homePage.title');
 */

var config = require('../config/config.js');
var languageContents = require('../contents/language-' + config.market);

var getKeyValue = function(obj, key){
  return obj[key];
};


var getI18nValue = function (keyChain) {
  var keys = keyChain.split('.');
  var result = languageContents;

  for(var i in keys){
    var value = getKeyValue(result, keys[i]);
    if(value) {
      // return key value if key value exist
      result = value;
    } else {
      // return key name if key value not exist
      result = keyChain;
      break;
    }
  }

  return result;
};


var getTranslatedContent = function(key){

  if(key){
    return getI18nValue(languageContents, key);
  } else {
    throw new Error('i18n key is required.');
  }

};


module.exports.getTranslatedContent = getTranslatedContent;