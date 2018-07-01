import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component(
{
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit
{
  btc=localStorage.getItem('BTC');
  xrp=localStorage.getItem('XRP');
  ada=localStorage.getItem('ADA');

  public lineChartData:Array<any> = [
    [this.btc, this.xrp, this.ada]
  ];
  public lineChartLabels:Array<any> = ['Bitcoin', 'Ripple', 'Cardano'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';

  public pieChartLabels:string[] = ['BTC', 'XRP', 'ADA'];
  public pieChartData:string[] = [this.btc, this.xrp, this.ada];

  constructor(private authService:AuthService) {}

  public randomizeType():void
  {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e:any):void
  {
    console.log(e);
  }

  public chartHovered(e:any):void
  {
    console.log(e);
  }
  ngOnInit()
  {
    console.log(this.btc);
    console.log(this.xrp);
    console.log(this.ada);
  }

}
