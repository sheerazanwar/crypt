import { Injectable, ElementRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as highcharts from 'highcharts/highstock';

@Injectable()
export class ChatService
{
  private socket;
  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService,private http: Http) { }

  createAuthenticationHeaders()
  {
    this.authService.loadToken();
    this.options = new RequestOptions(
    {
      headers: new Headers(
      {
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  render(el: HTMLElement, config:any)
  {
    highcharts.stockChart(el, config)
  }

  checkPrice(coin)
  {
    this.createAuthenticationHeaders();
    this.socket.emit('coin-price', coin, this.options);
  }

  checktrade(coin,id)
  {
    this.createAuthenticationHeaders();
    this.socket.emit('tradeHistory', coin, id, this.options);
  }

  checkTicker(coin)
  {
    this.createAuthenticationHeaders();
    this.socket.emit('mini-ticker', coin, this.options);
  }

  checkmarket(coin)
  {
    this.createAuthenticationHeaders();
    this.socket.emit('coin-market', coin, this.options);
  }

  candlestick(coin)
  {
    this.createAuthenticationHeaders();
    this.socket.emit('candlestick', coin, this.options);
  }


  getPrice()
  {
    let observable = new Observable(observer =>
      {
      this.socket = io(this.domain);
      this.socket.on('coin-price', (data) =>
      {
        observer.next(data);
      });
      return () =>
      {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getTrade()
  {
    let observable = new Observable(observer =>
      {
      this.socket = io(this.domain);
      this.socket.on('tradeHistory', (data) =>
      {
        observer.next(data);
      });
      return () =>
      {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  miniTicker()
  {
    let observable = new Observable(observer =>
      {
      this.socket = io(this.domain);
      this.socket.on('miniTicker', (data) =>
      {
        observer.next(data);
      });
      return () =>
      {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getmarket()
  {
    let observable = new Observable(observer =>
      {
      this.socket = io(this.domain);
      this.socket.on('coin-market', (data) =>
      {
        observer.next(data);
      });
      return () =>
      {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getcandlestick()
  {
    let observable = new Observable(observer =>
      {
      this.socket = io(this.domain);
      this.socket.on('candlestick', (data) =>
      {
        observer.next(data);
      });
      return () =>
      {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
