import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  // currentUser: any = {};
  // constructor(
  //   public authService: AuthService,
  //   private actRoute: ActivatedRoute
  // ) {
  //   let id = this.actRoute.snapshot.paramMap.get('id');
  //   this.authService.getUserProfile(id).subscribe((res) => {
  //     this.currentUser = res.msg;
  //   });
  // }
  signinForm: FormGroup;
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
  ngOnInit() {}
  loginUser() {
    console.log(this.signinForm.value);
    
    this.authService.signIn(this.signinForm.value);
  }
  // login(){
  //   let id = this.loginForm.value.identifiant?this.loginForm.value.identifiant: "";
  //   let psw = this.loginForm.value.password?this.loginForm.value.password: "";
  //   // this.service.login(id,psw);
  //   // console.log('component');
  //   this.service.login(id,psw).subscribe((res:any) => {
  //     if (res.result) {
  //       this.loginForm.reset();
  //       this.router.navigate(['log-in']);
  //     }
  //   });
    
  // }
  // registerUser() {
  //   this.service.signUp(this.loginForm.value).subscribe((res) => {
  //     if (res.result) {
  //       this.loginForm.reset();
  //       this.router.navigate(['login']);
  //     }
  //   });
  // }
  
  
}
