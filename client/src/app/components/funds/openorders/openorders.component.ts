import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-openorders',
  templateUrl: './openorders.component.html',
  styleUrls: ['./openorders.component.css']
})
export class OpenordersComponent implements OnInit
{
  showSpinner:boolean = true;
  message;
  messageClass;
  btc=0;
  coin;
  i=0;
  open=0;
  x=0;
  y=0;
  idx= localStorage.getItem('id');
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
      if (!data.success)
      {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      else
      {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    });
  }

  ngOnInit()
  {
    this.chatService.getTrade().subscribe(data =>
    {
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
      // console.log("OpenOrder BTC = ",this.open);
      // console.log("Filled : ",this.filled);
      // console.log("UnFilled : ",this.unfilled);
      this.showSpinner=false;
    });

    this.authService.balance(this.idx).subscribe(data=>
    {
      this.btc=data.btcValue;
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
