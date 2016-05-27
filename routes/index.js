var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
// var dbURI = 'mongodb://Anik657:solome@ec2-54-152-247-43.compute-1.amazonaws.com:27017/solomeDB';
var dbURI = 'mongodb://localhost:27017/oracleDB';
var Balances = mongoose.model('Balance');
var Orders = mongoose.model('Order');
var Trades = mongoose.model('Trade');
var Histories = mongoose.model('History');

mongoose.connect(dbURI);
/* webSocket Module */
var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});

/* webSocket Middleware*/
connection.onopen = function (session) {
        function marketEvent (args,kwargs) {
                // console.log(args);
                for (i=0; i < args.length; ++i){
                  // console.log(args[i].type);
                  if (args[i].type == 'newTrade') {
                    console.log(args[i]);
                    var History = new Histories;
                    History.globalTradeID = args[i].data.globalTradeID;
                    History.tradeID = args[i].data.tradeID;
                    History.date = args[i].data.date;
                    History.type = args[i].data.type;
                    History.amount = args[i].data.amount;
                    History.total = args[i].data.total;

                    History.save(function(err, histories) {
                        if (err) {
                            return next(err);
                        }
                        if (!histories) {
                            console.log('message: got nothing!')
                        }
                        console.log('data saved!');
                    });
                  }
                }
        }
        // function tickerEvent (args,kwargs) {
        //         console.log(args);
        // }
        // function trollboxEvent (args,kwargs) {
        //         console.log(args);
        // }
        session.subscribe('BTC_LSK', marketEvent);
        // session.subscribe('ticker', tickerEvent);
        // session.subscribe('trollbox', trollboxEvent);
}

connection.onclose = function () {
  console.log("Websocket connection closed");
}

connection.open();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Trading History */
router.get('/history', function(req, res, next) {
  Histories.find(function(err, histories) {
      if (err) {
          return console.error(err)
      };
      res.send(histories);
  });
});


module.exports = router;
