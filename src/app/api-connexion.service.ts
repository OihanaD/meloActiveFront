import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiConnexionService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:8000';
  private urlClients = "/api/clients";
  private urlCoach = "/api/coaches";
  private urlClientCoachSession = "/api/clients_coaching_sessions";
  private urlCoachSession = "/api/coaching_sessions";
  private urlInformations = "/api/informations";
  private urlpayments = "/api/payments";
  private urlpaymentsTotal = "/api/payments/total";


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
  getClientsCoachingSessions(): Observable<any> {
    // console.log(urlId);
    
    return this.http.get<any[]|unknown>(this.url+this.urlClientCoachSession, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getCoach(): Observable<any[]|unknown> {
    return this.http.get<any[]|unknown>(this.url + this.urlCoach, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getSessionsPerDate(year:any, month:any, firstday:any){
    return this.http.get<any[]|unknown>(this.url + this.urlInformations+ "/"+ year+ "/" + month+ "/" + firstday, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getPayments(){
    return this.http.get<any[]|unknown>(this.url + this.urlpayments, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getPaymentsPerMonthPayed(month:any, year:any){
    return this.http.get<any[]|unknown>(this.url + this.urlpaymentsTotal +"/"+  month + "/"+  year, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getPaymentsWaiting(){
    return this.http.get<any[]|unknown>(this.url + this.urlpaymentsTotal +"/"+ "wait", {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }

}