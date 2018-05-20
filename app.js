var mysql = require('mysql');
var requestHelper = require('./request-helper')
var scrapingHelper = require('./scraping-helper')
var mongoose = require('mongoose')
var Proxy = require('./models/ProxyModel')
var meta = require('./meta')
var cron = require('node-cron');
var util = require('util')
function doRedo(){

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proxies"
});

var printStatus = function (con, list) {
   console.log(list);
console.log('truncate');
  var sql = "truncate table proxies";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('insert into');

    for (var l in list){
      //if (list[l].country == "United States"){
      console.log(list[l]);
  var sql = "INSERT INTO proxies (ipAddress, port, protocol, country) VALUES ('" + list[l].ip + "', '" + list[l]['port'].toString() + "', '" + list[l]['anonymity'].toLowerCase() + "', '" + list[l].country + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
//}
  }
    console.log("inserted");
  });
}
con.connect(function(err) {
  if (err) throw err;
  var list = [];
var counter = 0
    proxiesAdded = 0
    proxiesFound = 0
    counter = 0
    var totalRequests = meta.length
    meta.forEach(function (metaObj) {
        metaObj.maxLength ? totalRequests += metaObj.maxLength : totalRequests += 0;
        if (metaObj.maxLength) {
            totalRequests--;
            for (var index = 1; index <= metaObj.maxLength; index++) {
                requestHelper(util.format(metaObj.url, index), metaObj.method, metaObj.body, function (err, response, body) {
                    if (!err) {
                        metaObj.parse(response.request.href, body).forEach(function (proxy) {
                          if (proxy['anonymity']){
                                                  if (proxy['anonymity'].toLowerCase().startsWith("socks")){

                           list.push(proxy);
                           console.log(proxy['anonymity']);
                        }
                      }
                        });
                    }
                    counter++;
                    if (counter == totalRequests) printStatus(con, list)
                })
            }
        } else {
            requestHelper(metaObj.url, metaObj.method, metaObj.body, function (err, response, body) {
                if (!err) {
                    metaObj.parse(response.request.href, body).forEach(function (proxy) {
                       if (proxy['anonymity']){
                       if (proxy['anonymity'].toLowerCase().startsWith("socks")){
                        list.push(proxy);
                        console.log(proxy['anonymity']);
                      }
                    }
                    });
                }
                counter++;
                if (counter == totalRequests) printStatus(con, list)
            })
        }
    });

  

});
}
doRedo();
setInterval(doRedo, 60 * 30 * 1000);

// `gettingProxies` is an event emitter object.

const express = require('express')
const app = express()
app.get('/', function (req, res) {
  
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proxies"
});

con.connect(function(err) {
  if (err) throw err;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

 var sql = "INSERT INTO clients (ipAddress, uuid, lastlogon, country) VALUES ('" + ip + "', '" + req.query.uuid + "', NOW(), '" + list[l].country + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
});
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proxies"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM proxies", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))