import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component(
{
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})

export class CoinsComponent implements OnInit
{
  currentUrl;
  user;
  coins;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit()
  {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.checkCoins(this.currentUrl.id).subscribe(data=>
    {
      console.log(data);
      this.user=data.user;
      this.coins=data.coins;
    });
  }

}
