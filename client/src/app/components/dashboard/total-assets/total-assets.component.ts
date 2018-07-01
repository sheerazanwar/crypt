import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-total-assets',
  templateUrl: './total-assets.component.html',
  styleUrls: ['./total-assets.component.css']
})
export class TotalAssetsComponent implements OnInit
{
  total;
  showSpinner:boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit()
  {
    this.authService.totalBalance().subscribe(data=>
    {
      this.total=data.balance;
      this.showSpinner=false;
    });
  }

}
