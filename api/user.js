const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const http = require('http');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const hashedPassword = require('password-hash');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const binance = require('node-binance-api');
var coins = require('../models/coin.js');

binance.options(
{
  APIKEY: process.env.apiKeys,
  APISECRET: process.env.apiSecrets,
  useServerTime: true,
  test: false
});

exports.homePage = function (req, res)
{
  res.sendFile(__dirname + '/index.html');
}

exports.profile=function (req,res)
{
  User.findOne({ _id: req.params.id }).exec(function(err, user)
  {
    if (err)
    {
      res.json({ success: false, message: err });
    }
    else
    {
      if (!user)
      {
        res.json({ success: false, message: 'User not found' });
      }
      else
      {
        res.json({ success: true, user: user });
      }
    }
  });
}



exports.changepass = function(req,res)
{
  User.findOne({ _id: req.body.id }, (err, user) =>
  {
    if (err)
    {
      res.json({ success: false, message: 'Not a valid user id' });
    }
    else
    {
      if (!user)
      {
        res.json({ success: false, message: 'User id was not found.' });
      }
      else
      {
        user.password=req.body.password;
        user.save((err) =>
        {
          if (err)
          {
            if (err.errors)
            {
              res.json({ success: false, message: 'Please ensure form is filled out properly' });
            }
            else
            {
              res.json({ success: false, message: err });
            }
          }
          else
          {
            res.json({ success: true, message: "User Updated !!!" });
          }
        });
      }
    }
  });
}

exports.checkname=function (req,res)
{
  if (!req.params.username)
  {
    res.json({ success: false, message: 'Username was not provided' });
  }
  else
  {
    User.findOne({ username: req.params.username }, (err, user) =>
    {
      if (err)
      {
        res.json({ success: false, message: err });
      }
      else
      {
        if (user)
        {
          res.json({ success: false, message: 'Username is already taken' });
        }
        else
        {
          res.json({ success: true, message: 'Username is available' });
        }
      }
    });
  }
};


exports.checkemail=function (req,res)
{
  if (!req.params.email)
  {
    res.json({ success: false, message: 'E-mail was not provided' });
  }
  else
  {
    User.findOne({ email: req.params.email }, (err, user) =>
    {
      if (err)
      {
        res.json({ success: false, message: err });
      }
      else
      {
        if (user)
        {
          res.json({ success: false, message: 'E-mail is already taken' });
        }
        else
        {
          res.send({ success: true, message: 'E-mail is available' });
        }
      }
    });
  }
};


exports.register = function (req, res)
{
  if (!req.body.email)
  {
    res.json({ success: false, message: 'You must provide an e-mail' });
  }
  else
  {
    if (!req.body.username)
    {
      res.json({ success: false, message: 'You must provide a username' });
    }
    else
    {
      if (!req.body.password)
      {
        res.json({ success: false, message: 'You must provide a password' });
      }
      else
      {
        let user = new User(
        {
          email: req.body.email.toLowerCase(),
          username: req.body.username.toLowerCase(),
          name: req.body.name,
          password: req.body.password,
          country: req.body.country,
          mobile: req.body.mobile
        });
        user.save((err) =>
        {
          if (err)
          {
            if (err.code === 11000)
            {
              res.json({ success: false, message: 'Username or E-mail already exists' });
            }
            else
            {
              if (err.errors)
              {
                if (err.errors.email)
                {
                  res.json({ success: false, message: err.errors.email.message });
                }
                else
                {
                  if (err.errors.username)
                  {
                    res.json({ success: false, message: err.errors.username.message });
                  }
                  else
                  {
                    if (err.errors.password)
                    {
                      res.json({ success: false, message: err.errors.password.message });
                    }
                    else
                    {
                      res.json({ success: false, message: err });
                    }
                  }
                }
              }
              else
              {
                res.json({ success: false, message: 'Could not save user. Error: ', err });
              }
            }
          }
          else
          {
            res.json({ success: true, message: 'Account registered!' });
          }
        });
      }
    }
  }
};


exports.authenticate = function (req, res)
{
  if (req.body.email != null && req.body.email != "")
  {
    User.findOne({ email: req.body.email , isDeleted:false}).select('+password').exec(function (err, user)
    {
      if (err)
      {
        throw err;
      }
      else if (user)
      {
        if (user.comparePassword(req.body.password, function (err, isMatch)
        {
          if (isMatch && !err)
          {
            user.password = undefined;
            var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
            User.findOne({_id:user._id}).then(function(found)
            {
              coins.find({user_id:user._id}).exec(function(error,coinResult){
                if(error){
                  res.status(500).send({error:error});
                }else{
              res.status('200').send({ success: true, token: 'JWT ' + token, user: found, id: found._id, message: 'Login Sucessfuly !!',coin:coinResult});
                }
              })
            })
          }
          else
          {
            res.json({ success: false, message: 'Password did not match.' });
          }
        }));
      }
      else
      {
        res.json({ success: false, message: 'user not found' });
      }
    });
  }
  else
  {
    res.json({ success: false, message: "Perameters Missing" });
  }
}


exports.edit = function (req, res)
{
  User.findOne({ _id: req.user._id }).select('+password').exec(function (error, user) {
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    user.save(function (error, user)
    {
      if (error)
      {
        res.status('500').send({ error: error })
      }
      else
      {
        res.status('200').send({ message: 'updated' })
      }
    });
  })
}


exports.getAllUserList = function(req,res){
  User.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      res.status(200).send({result:result});
    }
  })
}
