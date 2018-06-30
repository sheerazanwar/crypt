import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { ExchangeComponent } from '../exchange.component';
import { GraphComponent } from '../graph/graph.component';

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
  constructor(private exchange:ExchangeComponent, private chatService: ChatService, private authService: AuthService, private graphComponent: GraphComponent) { }

  coin(crypto)
  {
    this.exchange.prices(crypto);
    this.exchange.markets(crypto);
    this.exchange.ticker(crypto);
    this.graphComponent.candlestick(crypto);
  }

  ngOnInit()
  {
    this.chatService.getPrice().subscribe(data =>
    {
      this.alpha=data;
      this.rates=this.alpha.tickers;
    });
  }
}
