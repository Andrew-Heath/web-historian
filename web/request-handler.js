var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var urlParts = url.parse(req.url);
  if (req.method === 'GET') {
    if (urlParts.pathname === '/') {
      fs.readFile(__dirname + '/public/index.html', 'utf-8', (err, data) => {
        if (err) { return console.log(err); }
        res.end(data);
      });
    } else {

    }
  }  
};