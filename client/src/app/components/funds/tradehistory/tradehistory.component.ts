import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.css']
})
export class TradehistoryComponent implements OnInit
{
  btc=0;
  open=0;
  coin;
  i=0;
  x=0;
  y=0;
  filled=[];
  unfilled=[];
  ids = localStorage.getItem('id');
  trades;
  sub;

  constructor( private chatService: ChatService, private authService: AuthService) { }

    tradeHistory(crypto)
    {
      this.coin= crypto.concat("BTC");
      this.chatService.checktrade(this.coin,this.ids);
    }

    cancelone(id,symbol)
    {
      this.authService.cancelone(id,symbol).subscribe(data=>
      {
        console.log(data);
      });
    }

    ngOnInit()
    {
      this.authService.balance(this.ids).subscribe(data=>
      {
        this.btc=data.btcValue;
      });

      this.chatService.getTrade().subscribe(data =>
      {
        this.open=0;
        this.filled=[];
        this.unfilled=[];
        this.x=0;
        this.y=0;
        this.trades=data;
        this.trades=this.trades.history;
        // console.log(this.trades);
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
        // console.log("OpenOrder BTC = ",this.open);
        // console.log("Filled : ",this.filled);
        // console.log("UnFilled : ",this.unfilled);
      });

      this.sub = Observable.interval(5000).subscribe((val) =>
      {
        this.tradeHistory("XRP");
      });

      setTimeout(() =>
      {
        this.tradeHistory("XRP");
      }, 500);
    }

  }
