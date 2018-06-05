import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{
  form:FormGroup;
  message;
  messageClass;
  username;
  email;
  phone;
  country;
  change=false;
  id = localStorage.getItem('id');

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router:Router)
  {
    this.createForm();
  }

  createForm()
  {
    this.form = this.formBuilder.group(
    {
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    },
    { validator: this.matchingPasswords('password', 'confirm') });
  }

  validatePassword(controls)
  {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d]).{8,35}$/);
    if (regExp.test(controls.value))
    {
      return null;
    }
    else
    {
      return { 'validatePassword': true }
    }
  }

  matchingPasswords(password, confirm)
  {
    return (group: FormGroup) =>
    {
      if (group.controls[password].value === group.controls[confirm].value)
      {
        return null;
      }
      else
      {
        return { 'matchingPasswords': true }
      }
    }
  }

  changes()
  {
    this.change=true;
  }

  onSubmit()
  {
    const pass = {
      password: this.form.get('password').value,
      id: localStorage.getItem('id')
    }

    this.authService.changepass(pass).subscribe(data=>
    {
      if (!data.success)
      {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      else
      {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>
        {
          this.router.navigate(['/exchange']);
        }, 2000);
      }
      console.log("saasa");
    });
  }

  ngOnInit()
  {
    this.authService.getProfile(this.id).subscribe(profile=>
    {
      this.username= profile.user.username;
      this.email= profile.user.email;
      this.phone= profile.user.mobile;
      this.country= profile.user.country;
    })
  }
}
