import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit
{
  users;
  showSpinner:boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit()
  {
    this.authService.userData().subscribe(data=>
    {
      this.users=data.result;
      this.showSpinner=false;
    })
  }

}
