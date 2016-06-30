// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var _ = require('underscore');
var CronJob = require('cron').CronJob;

var job = new CronJob('00 * * * * *', () => {
  var urlArray = [];
  archive.readListOfUrls((outputUrls) => {
    _.each(outputUrls, (url) => {
      archive.isUrlArchived(url, (expects) => {
        if (!expects) {
          archive.downloadUrls([url]);
        }
      });
    });
  });

});

job.start();