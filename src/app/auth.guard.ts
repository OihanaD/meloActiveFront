// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   // constructor(private service:AuthService, private router:Router){}
//   // canActivate(){
//   //   console.log('guard');
//   //   if(this.service.isLoggedIn == true){
//   //     return true;

//   //   }
//   //   this.router.navigate(['/login']);
//   //   return false;

    
//   // }
//   constructor(public authService: AuthService, public router: Router) {}
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//   //   | Observable<boolean | UrlTree>
//   //   | Promise<boolean | UrlTree>
//   //   | boolean
//   //   | UrlTree {
//   //   if (this.authService.isLoggedIn !== true) {
//   //     window.alert('Access not allowed!');
//   //     this.router.navigate(['login']);
//   //   }
//   //   return true;
//   // }
// }
