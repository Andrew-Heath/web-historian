var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf-8', (err, data) => {
    if (err) { return console.log(err); }
    var output = data.split('\n');
    cb(output.slice());
  });
};

exports.isUrlInList = function(checkUrl, cb) {
  exports.readListOfUrls(urls => {
    if (_.indexOf(urls, checkUrl) > -1) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

exports.addUrlToList = function(addUrl, cb) {
  exports.isUrlInList(addUrl, expects => {
    if (!expects) {
      fs.appendFile(exports.paths.list, '\n' + addUrl, 'utf-8', (err) => {
        if (err) { return console.log(err); }
        cb();
      });
    }
  });
};

exports.isUrlArchived = function(checkUrl, cb) {
  fs.readFile(exports.paths.archivedSites + '/' + checkUrl, 'utf-8', (err, data) => {
    if (err) {
      cb(false);
      return console.log(err);
    }
    cb(true);
  });
};

exports.downloadUrls = function() {
};
