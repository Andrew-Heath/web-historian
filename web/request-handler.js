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
      fs.readFile(__dirname + '/public/index.html', 'utf-8', (err, data) => {
        if (err) { return console.log(err); }
        res.end(data);
      });
    } else {
      archive.isUrlInList(urlParts, (exists) => {
        if (exists) {
          archive.isUrlArchived(urlParts, (exists) => {
            if (exists) {
              // returns file in ?
            } else {
              // returns loading page
            }
          });
        } else {
          statusCode = 404;
          res.writeHead(statusCode, header);
          res.end('file not found');
        }
      });
    } 
  } else if (req.method === 'POST') {

  }  

};