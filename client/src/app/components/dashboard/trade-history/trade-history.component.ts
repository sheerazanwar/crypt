import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent implements OnInit
{
  history;
  showSpinner:boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit()
  {
    this.authService.tradeHistory().subscribe(data =>
    {
      this.history=data.result;
      this.showSpinner=false;
    });
  }

}
