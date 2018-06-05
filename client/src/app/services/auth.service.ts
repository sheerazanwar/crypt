import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService
{
  domain = "https://cryptojsbackend.herokuapp.com";
  authToken;
  user;
  options;
  result:any;

  constructor(private http: Http) {}

  createAuthenticationHeaders()
  {
    this.loadToken();
    this.options = new RequestOptions(
    {
      headers: new Headers({'Content-Type': 'application/json','authorization': this.authToken})
    });
  }

  loadToken()
  {
    this.authToken = localStorage.getItem('token');
  }

  // getprice()
  // {
  //   return this.http.get('https://api.coindesk.com/v1/bpi/currentprice/btc.json', this.options).map(res => res.json());
  // }

  getprice()
  {
    return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ADA,ADX,AE,AION,AMB,APPC,ARK,ARN,ERC20,AST,BAT,BCC,BCD,BCPT,BLZ,BNB,BNT,BQX,ETH,XRP,XLM,IOT&tsyms=BTC,USD,EUR').map(result => this.result = result.json());
  }

  registerUser(user)
  {
    return this.http.post(this.domain + '/register', user).map(res => res.json());
  }

  checkUsername(username)
  {
    return this.http.get(this.domain + '/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email)
  {
    return this.http.get(this.domain + '/checkEmail/' + email).map(res => res.json());
  }

  login(user)
  {
    return this.http.post(this.domain + '/login', user).map(res => res.json());
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user, id)
  {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(id)
  {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/profile/'+id, this.options).map(res => res.json());
  }

  getAddress(coinName)
  {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/getDepositAddress/'+coinName, this.options).map(res => res.json());
  }

  loggedIn()
  {
    return tokenNotExpired();
  }

  changepass(pass)
  {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/api/changepass', pass, this.options).map(res => res.json());
  }

  buy_sell(buy)
  {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/api/placeLimitOrder', buy, this.options).map(res => res.json());
  }

  withdraws(withdraw)
  {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/api/withdraw', withdraw, this.options).map(res => res.json());
  }

  deposits(deposit)
  {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/api/checkDepositWithTranscationId', deposit, this.options).map(res => res.json());
  }

  cancelOrder()
  {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/removeAllOrders', this.options).map(res => res.json());
  }

  cancelone(id,symbol)
  {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/removeSingleOrder/'+id+"+"+symbol, this.options).map(res => res.json());
  }

  balance(id)
  {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/getEstimatedValue/'+id, this.options).map(res => res.json());
  }
}
