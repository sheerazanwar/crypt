import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { ExchangeComponent } from '../exchange.component';
// import { ExchangeComponent } from '../graph/graph.component';

@Component(
{
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit
{
  rates:any;
  alpha;
  bitcoin:any;
  constructor(private exchange:ExchangeComponent, private chatService: ChatService, private authService: AuthService) { }

  coin(crypto)
  {
    // console.log(crypto);
    this.exchange.prices(crypto);
    this.exchange.markets(crypto);
    this.exchange.ticker(crypto);
  }

  ngOnInit()
  {
    this.chatService.getPrice().subscribe(data =>
    {
      this.alpha=data;
      this.rates=this.alpha.tickers;
      // console.log(this.rates);
    });

    // this.authService.getprice().subscribe(data =>
    // {
    //   console.log(data.bpi.USD.rate);
    //   this.bitcoin=data.bpi.USD.rate;
    // });
  }
}
