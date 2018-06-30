import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { getHighChartsData } from '../../../data/chart-fake-data';

@Component(
{
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit

{
  coin="XRP";
  chartData={};


  constructor(private authService:AuthService, private chatService: ChatService) {}

  candlestick(crypto)
  {
    this.coin=crypto;
    this.chatService.candlestick(this.coin);
  }

  ngOnInit()
  {
    var totalData = [];
    this.chatService.getcandlestick().subscribe(data =>
    {
      this.chartData={
              rangeSelector: {
                  selected: 1
              },

              // title: {
              //     text: "XRP"
              // },

              series: [{
                  type: 'candlestick',
                  name: 'Coin Value',
                  data: data,
                  dataGrouping: {
                      units: [
                          [
                              'week',
                              [4]
                          ], [
                              'month',
                              [1,2,3,4,5,6,7,8,9,10,11,12]
                          ]
                      ]
                  }
              }]
          };
    });

    setTimeout(() =>
    {
      this.candlestick(this.coin);
    }, 500);
  }
}
