var mongoose = require('mongoose');

var BalancesSchema = new mongoose.Schema({
    BTC:String,
    ETH:String,
    LSK:String,
    USD:String
});

// "globalTradeID":32753645,
// "tradeID":153176,
// "date":"2016-05-27 15:06:50",
// "type":"sell",
// "rate":"0.00084483",
// "amount":"73.42861878",
// "total":"0.06203470"

mongoose.model('Balance', BalancesSchema);
