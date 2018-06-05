import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';

@Component(
{
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})

export class ExchangeComponent implements OnInit
{
  showSpinner:boolean = true;
  form:FormGroup;
  form1:FormGroup;
  price;
  bitcoin=0;
  altcoin=0;
  market=[];
  total;
  coinz;
  alpha;
  info;
  req;
  boo;
  coin;
  small;
  pricecolor = 'black';
  connectionData;
  connectionData1;
  trades;
  oldprice=0;
  askk=[];
  bidask;
  bidsasks=[];
  sub;
  g=0;
  p1;
  name=false;
  prize=0;
  a1;
  p2;
  a2;
  index;
  sys;
  i=0;
  x=0;
  y=0;
  filled=[];
  unfilled=[];
  ids = localStorage.getItem('id');

  constructor(private formBuilder: FormBuilder, private _flashMessagesService: FlashMessagesService, private chatService: ChatService, private authService: AuthService)
  {
    this.createForm();
  }

  createForm()
  {
    this.form = this.formBuilder.group(
    {
      Price: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Ammount: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Total: ['']
    });

    this.form1 = this.formBuilder.group(
    {
      Price: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Ammount: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Total: ['']
    });
  }

  cancel()
  {
    this.authService.cancelOrder().subscribe(data=>
    {
      console.log(data);
    });
  }

  cancelone(id,symbol)
  {
    this.unfilled.forEach( (item, index) =>
    {
     if(item.status.orderId === id) this.unfilled.splice(index,1);
    });
    this.authService.cancelone(id,symbol).subscribe(data=>
    {
      console.log(data);
    });
  }

  validatePrice(controls)
  {
    const regExp = new RegExp(/[0-9]+(\.[0-9][0-9]?)?/);
    if (regExp.test(controls.value))
    {
      return null;
    }
    else
    {
      return {'validatePrice': true }
    }
  }

  prices(crypto)
  {
    this.showSpinner=true;
    this.coinz=crypto;
    this.coin= crypto.concat("BTC");
    this.chatService.checkPrice(this.coin);
    this.g=1;
    this.price=[];
    this.name=false;
    this.bidask=[];
    this.req=0;
    this.authService.getAddress(this.coinz).subscribe(data=>
    {
      if(data.coin!=null)
      {
        this.altcoin=data.coin.amount[0];
      }
      this.bitcoin=data.btc.amount[0];
    })
  }

  ticker(crypto)
  {
    this.coin= crypto.concat("BTC");
    this.chatService.checkTicker(this.coin);
  }

  markets(crypto)
  {
    this.coin= crypto.concat("BTC");
    this.chatService.checkmarket(this.coin);
  }

  tradeHistory()
  {
    this.chatService.checktrade("XRPBTC",this.ids);
  }

  onBuySubmit()
  {
    const buy = {
      type: "buy",
      quantity: this.form.get('Ammount').value,
      price: this.form.get('Price').value,
      coinName: this.coin
    }
    this.authService.buy_sell(buy).subscribe(data=>
    {
      this._flashMessagesService.show(data.message, { cssClass: 'alert-info', timeout: 2000 });
    });
  }

  onSellSubmit()
  {
    const sell = {
      type: "sell",
      quantity: this.form1.get('Ammount').value,
      price: this.form1.get('Price').value,
      coinName: this.coin
    }
    this.authService.buy_sell(sell).subscribe(data=>
    {
      this._flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 2000 });
    });
  }

  ngOnInit()
  {
    this.g=1;

    this.authService.getAddress(this.coinz).subscribe(data=>
    {
      console.log(data);
      if(data.coin!=null)
      {
        this.altcoin=data.coin.amount[0];
      }
    })

    this.chatService.getPrice().subscribe(data =>
    {
      this.sys=data;
      if(this.coin==this.sys.symbol)
      {
        this.price=data;
        this.bidask=this.price.bidask;
        this.index=this.price.symbol.indexOf("B");
        this.price.symbol=this.price.symbol.slice(0,this.index);

        this.bidsasks.push(this.bidask);
        if (this.bidsasks.length > 9) this.bidsasks.splice(0, 1);

        this.req=this.price.volume.substring(0, 10);
        if(this.oldprice>this.price.close)
        {
          this.pricecolor="red";
        }
        else if(this.oldprice<this.price.close)
        {
          this.pricecolor="green";
        }
        this.oldprice=this.price.close;
        if(this.g==1)
        {

          this.prize=this.price.close;
        }
        this.g=0;
        this.showSpinner=false;
        this.name=true;
      }
    });

    this.connectionData = this.chatService.getmarket().subscribe(data =>
    {
      this.market.push(data);
      if (this.market.length > 9) this.market.splice(0, 1);
    });

    this.connectionData1 = this.chatService.miniTicker().subscribe(data =>
    {
      this.askk.push(data);
      if (this.askk.length > 5) this.askk.splice(0, 1);
    });

    this.chatService.getTrade().subscribe(data =>
    {
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
          this.y++;
        }
      }
      // console.log("Filled : ",this.filled);
      // console.log("UnFilled : ",this.unfilled);
    });

    this.sub = Observable.interval(5000).subscribe((val) =>
    {
      this.tradeHistory();
    });

    setTimeout(() =>
    {
      this.tradeHistory();
    }, 500);

    setTimeout(() =>
    {
      this.prices("XRP");
    }, 500);

    setTimeout(() =>
    {
      this.ticker("XRP");
    }, 2000);

    setTimeout(() =>
    {
      this.markets("XRP");
    }, 500);
  }
}
