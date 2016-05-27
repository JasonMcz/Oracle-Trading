var mongoose = require('mongoose');

var OrdersSchema = new mongoose.Schema({
    orderID:Number,
    date:Date,
    type:String,
    amount:String,
    total:String,
    rating:Number
});

// "globalTradeID":32753645,
// "tradeID":153176,
// "date":"2016-05-27 15:06:50",
// "type":"sell",
// "rate":"0.00084483",
// "amount":"73.42861878",
// "total":"0.06203470"

mongoose.model('Order', OrdersSchema);
