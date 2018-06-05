require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const binance = require('node-binance-api');
const http = require('http');
const socket = require('socket.io');
var request = require('request');
const cors= require('cors');
const multer = require('multer');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
var port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
var history = require('./models/history.js');
var limitOrder = require('./models/limitOrder.js');
var coin = require('./models/coin.js');
var coinname="";
var app = require('express')();

var server =app.listen(port,function ()
{
  console.log("you are listeninig for request");
});

var io = socket(server);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: 'http://localhost:4200'}));

if (process.env.NODE_ENV !== 'production')
{
  process.env.url = 'http://localhost:3000/';
  process.env.db = process.env.dbConnect;
  process.env.jwtsecret = process.env.jwtsecret;
}

mongoose.connect('mongodb://sherryduggal:Sheeraz77@ds159509.mlab.com:59509/crypto', { useMongoClient: true }); // database conneciton to azure pro database
mongoose.connection.once('connected', () => console.log('Connected to database'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/unauthenticated.js'));
require('./config/passport')(passport);
app.use('/api', passport.authenticate('jwt', { session: false }), require('./routes/authenticated.js'));
app.get('*', (req, res) => res.status(404).send({ error: 'page not found' }));
var respData = [];
var thisCoin = "";

app.get('*', (req, res) =>
{
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


binance.options(
  {
    APIKEY: process.env.apiKeys,
    APISECRET: process.env.apiSecrets,
    useServerTime: true,
    test: false
  });

  io.on('connection', function(socket)
  {
    socket.on('coin-price', function(coin)
    {
      coinname=coin;
      // console.log(coin);
      binance.websockets.prevDay(coin, (error, response) =>
      {
        if(coin==coinname)
        {
          binance.prices((error, ticker) =>
          {
            binance.bookTickers(coin, (error, bidask) =>
            {
              // console.log("Coin =",coin,"ticker =",ticker);
              io.sockets.emit("coin-price",{ type: 'new-message', open:response.open, high:response.high, low:response.low, close:response.close, volume:response.quoteVolume, symbol:response.symbol, change:response.priceChange, tickers:ticker, bidask:bidask});
            });
          });
        }
      });
    });

    socket.on('mini-ticker',function(coin)
    {
      binance.websockets.miniTicker(markets =>
        {
          // socket.broadcast.to(socket.id).emit("miniTicker",{ticker:markets});
          io.sockets.emit("miniTicker",{ticker:markets});
        });
      })

      socket.on('coin-market', function(coin)
      {
        binance.websockets.trades([coin], (trades) =>
        {
          let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
          if(coin==coinname)
          {
            io.sockets.emit("coin-market",{ type: 'new-trade', price:price, time:eventTime, quantity:quantity, tradeId:tradeId, symbol:symbol, maker:maker});
          }
        });
      });

      socket.on('candlestick',function(coin)
      {
        console.log("candlestick called");
        if(coin!=thisCoin){
          respData=[];
          thisCoin = coin;
          request('https://min-api.cryptocompare.com/data/histohour?fsym='+coin+'&tsym=USD&limit=10000&aggregate=3&e=CCCAGG', function (error, response, body) {
            var xD = JSON.parse(body);
            var xData = xD.Data;
            xData.forEach(function(x,idx,i){
              respData[respData.length] = [parseFloat(x.time),parseFloat(x.high),parseFloat(x.low),parseFloat(x.open),parseFloat(x.close)];
              if(idx == i.length-1){
                coin = coin+"BTC";
                binance.websockets.candlesticks([coin], "1m", (candlesticks) =>
                {
                  let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
                  let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
                  respData[respData.length] = [eventTime,parseFloat(high),parseFloat(low),parseFloat(open),parseFloat(close)];
                  io.sockets.emit("candlestick",respData);
                });
              }
            });
          })
        }else{
          coin = coin+"BTC";
          binance.websockets.candlesticks([coin], "1m", (candlesticks) =>
          {
            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
            respData[respData.length] = [eventTime,parseFloat(high),parseFloat(low),parseFloat(open),parseFloat(close)];
            io.sockets.emit("candlestick",respData);
          });
        }
      })

      socket.on('tradeHistory',function(x,user_id)
      {
        var histor = [];
        var count = 0;
        limitOrder.find({user_id:user_id}).exec(function(error,result)
        {
          if(error)
          {
            io.sockets.emit("tradeHistory",{error:error});
          }
          else
          {
            if(result.length>0)
            {
              result.forEach(function(i, idx,x)
              {
                // console.log("current : ",i);
                let orderid = i.orderId;
                binance.orderStatus(i.symbol, orderid, (error, orderStatus, symbol) =>
                {
                  if(error)
                  {
                    // console.log(error.body);
                  }
                  else
                  {
                    // console.log("Binanace Hisotry = ",orderStatus);
                    histor[count] = {coin : symbol,status:orderStatus};
                    if(orderStatus.status=="FILLED"){
                      history.create({
                        user_id:user_id,
                        symbol: orderStatus.symbol,
                        orderId: orderStatus.orderId,
                        clientOrderId: orderStatus.clientOrderId,
                        transactTime: orderStatus.transactTime,
                        price: orderStatus.price,
                        origQty: orderStatus.origQty,
                        executedQty: orderStatus.executedQty,
                        status: orderStatus.status,
                        timeInForce: orderStatus.timeInForce,
                        type: orderStatus.type,
                        side: orderStatus.side
                      }).then(function(done){
                        if(orderStatus.side=="SELL"){
                          var btcValue =  parseFloat(orderStatus.price)* parseFloat(orderStatus.origQty);
                          coin.findOne({user_id:user_id,coinName:"BTC"}).exec(function(error,final){
                            if(error){

                            }else{
                              if(final){
                                final.amount = parseFloat(final.amount) + parseFloat(btcValue);
                                final.save(function(error,updat){
                                  if(error){

                                  }else{
                                    //console.log("done");
                                  }
                                })
                              }else{
                                coin.create({
                                  user_id:user_id,
                                  coinName:"BTC",
                                  amount:btcValue
                                }).then(function(created){
                                  //console.log("created");
                                })
                              }
                            }
                          })
                        }else{
                          coin.findOne({user_id:user_id,coinName:orderStatus.symbol}).exec(function(error,final1){
                            if(error){

                            }else{
                              if(final1){
                                final1.amount = parseFloat(final1.amount)+parseFloat(orderStatus.origQty);
                                final1.save();
                              }else{
                                coin.create({
                                  user_id:user_id,
                                  amount:orderStatus.origQty,
                                  coinName:orderStatus.symbol
                                }).then(function(doneit){
                                  //console.log("created ");
                                })
                              }
                            }
                          })
                        }
                      })
                    }
                  }
                  if (idx === x.length - 1){
                    // console.log("tradeHistory",{history:histor})
                    io.sockets.emit("tradeHistory",{history:histor});
                  }
                  count = count+1;
                  // console.log(symbol+" order status:", orderStatus);
                });
              })

            }else{
              io.sockets.emit("tradeHistory",{history:[]});
            }
          }
        })
      })
      socket.on('chart',function(coin){
        binance.websockets.chart(coin, "1m", (symbol, interval, chart) => {
          let tick = binance.last(chart);
          const last = chart[tick].close;
          //console.log(chart);
          io.sockets.emit("chart",{chart:chart});
        });
      })
    });
