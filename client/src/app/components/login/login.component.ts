import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form : FormGroup;
  previousUrl;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
    ) {
this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  // Function to disable form
  disableForm() {
    this.form.controls['email'].disable(); // Disable email field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['email'].enable(); // Enable email field
    this.form.controls['password'].enable(); // Enable password field
  }

  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      email: this.form.get('email').value, // email input field
      password: this.form.get('password').value // Password input field
    }

    this.authService.login(user).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user, data.id);
        // After 2 seconds, redirect to dashboard page
        setTimeout(() => {
          if(this.previousUrl)
          {
            this.router.navigate([this.previousUrl]);
          }
          else
          {
            this.router.navigate(['/exchange']); // Navigate to dashboard view
          }
        }, 500);
      }
    });
  }
//jj

  ngOnInit() {
    if(this.authGuard.redirectUrl){
      this.messageClass='alert alert-danger';
      this.message="Login to access this page !!!";
      this.previousUrl= this.authGuard.redirectUrl;
      this.authGuard.redirectUrl=undefined;
    }
  }
}
