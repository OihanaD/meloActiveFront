import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirecturl?:string;  
  endpoint: string = 'http://127.0.0.1:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private errorMessageSubject = new BehaviorSubject<string>(''); // BehaviorSubject pour le message d'erreur
  errorMessage$ = this.errorMessageSubject.asObservable();

    constructor(private http: HttpClient, public router: Router) {}
    // Sign-up
    signUp(user: any): Observable<any> {
      let api = `${this.endpoint}/login`;
      console.log(user);
      
      return this.http.post(api, user).pipe(catchError(this.handleError));
    }

 
    signIn(user: any) {
      this.errorMessageSubject.next('');
      this.http.post<any>(this.endpoint + '/login', user).subscribe(
        (res: any) => {
         
          localStorage.setItem('access_token', res.token);
          this.router.navigate(['home']);
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessageSubject.next('Votre email ou votre mot de passe est incorrect'); // Émet le message d'erreur
          } else {
            this.errorMessageSubject.next('Une erreur s\'est produite lors de la connexion.');
          }
        }
      );
    }
    getToken() {
      return localStorage.getItem('access_token');
    }
    get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return authToken !== null ? true : false;
    }
    doLogout() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['log-in']);
      }
    }
    // User profile
    getUserProfile(id: any): Observable<any> {
      let api = `${this.endpoint}/user-profile/${id}`;
      return this.http.get(api, { headers: this.headers }).pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
    }
    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
}
