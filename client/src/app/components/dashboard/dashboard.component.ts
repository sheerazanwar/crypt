import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component(
{
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit
{
  users=0;
  btc=0;
  xrp=0;
  ada=0;

  constructor(private authService:AuthService) { }

  localStorage()
  {
    this.authService.totalBalance().subscribe(data=>
    {
      this.btc=parseFloat(data.balance.BTC.available);
      this.xrp=parseFloat(data.balance.XRP.available);
      this.ada=parseFloat(data.balance.ADA.available);
      localStorage.setItem('BTC', JSON.stringify(this.btc));
      localStorage.setItem('XRP', JSON.stringify(this.xrp));
      localStorage.setItem('ADA', JSON.stringify(this.ada));
    });
  }

  ngOnInit()
  {
    this.authService.userCount().subscribe(data=>
    {
      this.users=data.result;
    });
    this.localStorage();
  }
}
