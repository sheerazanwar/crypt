import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { DepositComponent } from '../deposit/deposit.component';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';

@Component(
{
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit
{
  showSpinner:boolean = true;
  btc=0;
  assests=[];
  sys;
  coinsss="";
  i=0;
  open=0;
  x=0;
  y=0;
  filled=[];
  unfilled=[];
  ids = localStorage.getItem('id');
  trades;
  sub;


  constructor(private authService:AuthService, private depo:DepositComponent, private router: Router, private chatService: ChatService) { }

  deposit(coi)
  {
    this.i=0;
    this.sys=coi[0];
    if(coi[0]!="BTC")
    {
      this.i=this.sys.indexOf("B");
      this.sys=this.sys.slice(0,this.i);
    }
    const info = {symbol: this.sys};
    this.router.navigate(['/deposit']);
    setTimeout(() =>
    {
      this.depo.deposits(info);
    }, 3000);
  }

  withdraw(coi)
  {
    this.router.navigate(['/withdrawal']);
  }

  tradeHistory(crypto)
  {
    this.coinsss= crypto.concat("BTC");
    this.chatService.checktrade(this.coinsss,this.ids);
  }

  ngOnInit()
  {
    this.chatService.getTrade().subscribe(data =>
    {
      this.i=0;
      this.open=0;
      this.filled=[];
      this.unfilled=[];
      this.x=0;
      this.y=0;
      this.trades=data;
      this.trades=this.trades.history;
      for(this.i=0;this.i<this.trades.length;this.i++)
      {
        if(this.trades[this.i].status.status=="FILLED")
        {
          this.filled[this.x]=this.trades[this.i];
          this.x++;
        }
        else if(this.trades[this.i].status.status=="NEW")
        {
          this.trades[this.i].status.status=="UNFILLED"
          this.unfilled[this.y]=this.trades[this.i];
          this.open=this.open+(this.trades[this.i].status.price*this.trades[this.i].status.origQty);
          this.y++;
        }
      }
    });

    this.authService.balance(this.ids).subscribe(data=>
    {
      this.btc=data.btcValue;
      this.assests=data.coins;
      this.showSpinner=false;
    });

    this.sub = Observable.interval(15000).subscribe((val) =>
    {
      this.tradeHistory("XRP");
    });

    setTimeout(() =>
    {
      this.tradeHistory("XRP");
    }, 500);
  }
}
