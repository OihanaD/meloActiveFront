import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiConnexionService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:8000/api/';
  private urlClients = "clients";
  private urlCoachSession = "coaching_sessions";


  getClients(): Observable<any[]|unknown> {
    return this.http.get<any[]|unknown>(this.url + this.urlClients, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getCoachSession(): Observable<any[]|unknown> {
    const currentYear = new Date().getFullYear();
  
    return this.http.get<any[]>(this.url + this.urlCoachSession, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    }).pipe(
      map(sessions => sessions.filter(session => {
        const sessionYear = new Date(session.date_session).getFullYear();
        return sessionYear === currentYear;
      }))
    );
  }
}