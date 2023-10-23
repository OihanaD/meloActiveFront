import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
  signinForm: FormGroup;
  errorMessage: string = '';
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {
    this.authService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
  }
  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
  
  
}
