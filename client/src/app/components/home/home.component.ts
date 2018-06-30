import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dashboardComponent: DashboardComponent) { }

  ngOnInit()
  {
    this.dashboardComponent.localStorage();
  }

}
