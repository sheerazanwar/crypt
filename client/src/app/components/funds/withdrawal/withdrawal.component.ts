import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit
{
  btc=0;
  form: FormGroup;
  coin="ADX";
  tagshow=false;
  coinssss;
  i=0;
  alpha={ symbol: "ADX", name: "AdEx" };
  open=0;
  avail=0;
  x=0;
  y=0;
  filled=[];
  unfilled=[];
  ids = localStorage.getItem('id');
  trades;
  sub;

  values = [
    // { symbol: "ADA", name: "Cardano" },
    { symbol: "ADX", name: "AdEx" },
    { symbol: "AE", name: "Aeternity" },
    { symbol: "AION", name: "AION" },
    { symbol: "AMB", name: "Ambrosus" },
    { symbol: "APPC", name: "AppCoins" },
    { symbol: "ARK", name: "Ark" },
    { symbol: "ARN", name: "Aeron" },
    { symbol: "AST", name: "AirSwap" },
    { symbol: "BAT", name: "Basic Attention Token" },
    { symbol: "BCC", name: "Bitcoin Cash" },
    { symbol: "BCN", name: "Bytecoin" },
    { symbol: "BCPT", name: "BlockMason Credit Protocol" },
    { symbol: "BCX", name: "BitcoinX" },
    { symbol: "BLZ", name: "Bluzelle" },
    { symbol: "BNB", name: "Binance Coin" },
    { symbol: "BNT", name: "Bancor" },
    { symbol: "BQX", name: "ETHOS" },
    { symbol: "BRD", name: "Bread" },
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "BTG", name: "Bitcoin Gold" },
    { symbol: "BTM", name: "Bytom" },
    { symbol: "BTS", name: "BitShares" },
    { symbol: "CDT", name: "Blox" },
    { symbol: "CHAT", name: "ChatCoin" },
    { symbol: "CLOAK", name: "CloakCoin" },
    { symbol: "CMT", name: "CyberMiles" },
    { symbol: "CDN", name: "Cindicator" },
    { symbol: "CTR", name: "Centra" },
    { symbol: "DASH", name: "Dash" },
    { symbol: "DGB", name: "DigixDAO" },
    { symbol: "DLT", name: "Agrello" },
    { symbol: "DNT", name: "District0x" },
    { symbol: "EDO", name: "Eidoo" },
    { symbol: "ELF", name: "aelf" },
    { symbol: "ENG", name: "Enigma" },
    { symbol: "ENJ", name: "EnjinCoin" },
    { symbol: "EOS", name: "EOS" },
    { symbol: "ETC", name: "Ethereum Classic" },
    { symbol: "ETF", name: "ETF" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "EVX", name: "Everex" },
    { symbol: "FUEL", name: "Etherparty" },
    { symbol: "FUN", name: "FunFair" },
    { symbol: "GAS", name: "NeoGas" },
    { symbol: "GNT", name: "Golem" },
    { symbol: "GRS", name: "Groestlcoin" },
    { symbol: "GTO", name: "Gifto" },
    { symbol: "GVT", name: "Genesis Vision" },
    { symbol: "GXS", name: "GXChain" },
    { symbol: "HCC", name: "HeathCare Chain" },
    { symbol: "HSR", name: "Hshare" },
    { symbol: "ICN", name: "ICONOMI" },
    { symbol: "ICX", name: "ICON" },
    { symbol: "INS", name: "INS Ecosystem" },
    { symbol: "IOST", name: "IOStoken" },
    { symbol: "IOTA", name: "MIOTA" },
    { symbol: "KMD", name: "Komodo" },
    { symbol: "KNC", name: "KhyberNetwork" },
    { symbol: "LEND", name: "EthLend" },
    { symbol: "LINK", name: "ChainLink" },
    { symbol: "LLT", name: "LLToken" },
    { symbol: "LOOM", name: "Loom Network" },
    { symbol: "LRC", name: "Loopring" },
    { symbol: "LSK", name: "Lisk" },
    { symbol: "LTC", name: "Litecoin" },
    { symbol: "LUN", name: "Lunyr" },
    { symbol: "MANA", name: "Decentraland" },
    { symbol: "MCO", name: "MONACO" },
    { symbol: "MDA", name: "Moeda Loyalty Points" },
    { symbol: "MOD", name: "Modum" },
    { symbol: "MTH", name: "Monetha" },
    { symbol: "MTL", name: "Metal" },
    { symbol: "NANO", name: "NANO" },
    { symbol: "NAV", name: "NAV Coin" },
    { symbol: "NCASH", name: "Neculeus Vision" },
    { symbol: "NEBL", name: "Neblio" },
    { symbol: "NEO", name: "NEO" },
    { symbol: "NULS", name: "Nuls" },
    { symbol: "OAX", name: "openANX" },
    { symbol: "OMG", name: "OmiseGo" },
    { symbol: "ONT", name: "Ontology" },
    { symbol: "OST", name: "OST" },
    { symbol: "PIVX", name: "PIVX" },
    { symbol: "POA", name: "POA Network" },
    { symbol: "POE", name: "Po.et" },
    { symbol: "POWR", name: "PowerLedger" },
    { symbol: "PPT", name: "Populous" },
    { symbol: "QLC", name: "QLINK" },
    { symbol: "QSP", name: "Quantstamp" },
    { symbol: "QTUM", name: "Qtum" },
    { symbol: "RCN", name: "Rapio Credit Network" },
    { symbol: "RDN", name: "Radien Network Token" },
    { symbol: "REP", name: "Augar" },
    { symbol: "REQ", name: "Request Network" },
    { symbol: "RLC", name: "iExecRLC" },
    { symbol: "RPX", name: "Red Pulse" },
    { symbol: "SALT", name: "Salt" },
    { symbol: "SBTC", name: "Super Bitcoin" },
    { symbol: "SKY", name: "Skycoin" },
    { symbol: "SNGLS", name: "SingularDTV" },
    { symbol: "SNM", name: "SONM" },
    { symbol: "SNT", name: "Status" },
    { symbol: "STEEM", name: "Steem" },
    { symbol: "STORJ", name: "Storj" },
    { symbol: "STORM", name: "Storm" },
    { symbol: "STRAT", name: "Staits" },
    { symbol: "SUB", name: "Substratum" },
    { symbol: "SYS", name: "Syscoin" },
    { symbol: "TNB", name: "Time New Bank" },
    { symbol: "TNT", name: "Tierion" },
    { symbol: "TRIG", name: "Triggers" },
    { symbol: "TRX", name: "Tron" },
    { symbol: "TUSD", name: "TrueUSD" },
    { symbol: "USDT", name: "TetherUS" },
    { symbol: "VEN", name: "VeChain" },
    { symbol: "VIA", name: "Viacoin" },
    { symbol: "VIB", name: "Viderate" },
    { symbol: "VIBE", name: "VIBE" },
    { symbol: "WABI", name: "WaBi" },
    { symbol: "WAN", name: "Wancoin" },
    { symbol: "WAVES", name: "Waves" },
    { symbol: "WINGS", name: "WINGS" },
    { symbol: "WPR", name: "WePower" },
    { symbol: "WTC", name: "Walton" },
    { symbol: "XEM", name: "NEM" },
    { symbol: "XLM", name: "Stellar Lumens" },
    { symbol: "XRM", name: "Monero" },
    { symbol: "XRP", name: "Ripple" },
    { symbol: "XVG", name: "Verge" },
    { symbol: "XZC", name: "ZCoin" },
    { symbol: "YOYO", name: "YOYOW" },
    { symbol: "ZEC", name: "Zcash" },
    { symbol: "ZEN", name: "ZenCash" },
    { symbol: "ZIL", name: "Zilliqa" },
    { symbol: "ZRX", name: "0x" }
  ];

  constructor(private formBuilder: FormBuilder, private _flashMessagesService: FlashMessagesService, private authService: AuthService, private chatService: ChatService)
  {
    this.createForm();
  }

  createForm()
  {
    this.form = this.formBuilder.group(
    {
      Address: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(15)
      ])],
      Ammount: ['', Validators.compose(
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      TagAddress: ['0', Validators.compose(
      [
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Tagshow: ['']
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

  Tag()
  {
    if(this.tagshow==false)
    {
      this.tagshow=true;
    }
    else
    {
      this.tagshow=false;
    }
  }

  onSubmit()
  {
    const withdraw = {
      coinName: this.coin,
      amount: this.form.get('Ammount').value,
      address: this.form.get('Address').value,
      tag: this.form.get('TagAddress').value
    }
    this.authService.withdraws(withdraw).subscribe(data=>
    {
      this._flashMessagesService.show(data.message, { cssClass: 'alert-info', timeout: 2000 });
    });
  }

  withdraw(v:any)
  {
    this.coin=v.symbol;
    this.authService.getAddress(this.coin).subscribe(data=>
    {
      if(data.coin!=null)
      {
        this.avail=data.coin.amount[0];
      }
    })
  }

  tradeHistory(crypto)
  {
    this.coinssss= crypto.concat("BTC");
    this.chatService.checktrade(this.coinssss,this.ids);
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
    });

    this.authService.balance(this.ids).subscribe(data=>
    {
      this.btc=data.btcValue;
    });

    this.sub = Observable.interval(15000).subscribe((val) =>
    {
      this.tradeHistory("XRP");
    });

    this.withdraw(this.alpha);

    setTimeout(() =>
    {
      this.tradeHistory("XRP");
    }, 500);
  }

}
