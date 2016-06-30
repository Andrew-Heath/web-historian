var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var statusCode = 200;
  var header = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var urlParts = url.parse(req.url);
  if (req.method === 'GET') {
    if (urlParts.pathname === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf-8', (err, data) => {
        if (err) { return console.log('error', err); }
        res.writeHead(statusCode, header);
        res.end(data);
      });
    } else if (urlParts.pathname === '/styles.css') {
      fs.readFile(archive.paths.siteAssets + urlParts.pathname, 'utf-8', (err, data) => {
        if (err) { return console.log('error', err); }
        res.writeHead(statusCode, header);
        res.end(data);
      });
    } else {
      archive.isUrlArchived(urlParts.pathname, (exists) => {
        if (exists) {
          fs.readFile(archive.paths.archivedSites + urlParts.pathname, 'utf-8', (err, data) => {
            if (err) { return console.log('error', err); }
            res.writeHead(statusCode, header);
            res.end(data);
          });
        } else {
          statusCode = 404;
          res.writeHead(statusCode, header);
          res.end('file not found');
        }
      });
    } 
  } else if (req.method === 'POST') {
    req.on('data', (chunk) => {
      var data = chunk.toString('utf-8').substr(4);

      archive.isUrlInList(data, (exists) => {
        if (!exists) {
          archive.addUrlToList(data, () => {
          });
          fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf-8', (err, data) => {
            if (err) { return console.log('error', err); }
            statusCode = 302;
            res.writeHead(statusCode, header);
            res.end(data);
          });
        } else {
          archive.isUrlArchived(data, (exists) => {
            if (exists) {
              fs.readFile(archive.paths.archivedSites + '/' + data, 'utf-8', (err, data) => {
                if (err) { return console.log('error', err); }
                res.writeHead(statusCode, header);
                res.end(data);
              });
            } else {
              fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf-8', (err, data) => {
                if (err) { return console.log('error', err); }
                res.writeHead(statusCode, header);
                res.end(data);
              });
            }
          });
        }
      });
    });
    req.on('end', () => {});
  }
};




