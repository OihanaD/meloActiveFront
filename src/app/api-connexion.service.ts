import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Iclient } from './Interfaces/iclient';
import { ICoachingSession } from './Interfaces/icoaching-session';
import { Ipayment } from './Interfaces/ipayment';
import { IClientsCoachingSession } from './Interfaces/iclients-coaching-session';
import { IInformations } from './Interfaces/i-informations';
import { ItotalPayed } from './Interfaces/itotal-payed';
import { Icoach } from './Interfaces/icoach';
import { IdataClient } from './Interfaces/idata-client';


@Injectable({
  providedIn: 'root'
})
export class ApiConnexionService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:8000';
  private urlClients = "/api/clients";
  private urlClient = "/api/client/details";
  private urlCoach = "/api/coaches";
  private urlClientCoachSession = "/api/clients_coaching_sessions";
  private urlCoachSession = "/api/coaching_sessions";
  private urlInformations = "/api/informations";
  private urlpayments = "/api/payments";
  private urlpaymentsTotal = "/api/payments/total";


  getClients(): Observable<Iclient[]> {
    return this.http.get<Iclient[]>(this.url + this.urlClients, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getClienById(id:string):Observable<IdataClient[]>{
    return this.http.get<IdataClient[]>(`${this.url}${this.urlClient}/${id}`, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getCoachSession(): Observable<ICoachingSession[]> {
    const currentYear = new Date().getFullYear();
    return this.http.get<ICoachingSession[]>(this.url + this.urlCoachSession, {
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
  getClientsCoachingSessions(): Observable<IClientsCoachingSession[]> {
    return this.http.get<IClientsCoachingSession[]>(this.url+this.urlClientCoachSession, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getCoach(): Observable<Icoach[]> {
    return this.http.get<Icoach[]>(this.url + this.urlCoach, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getSessionsPerDate(year:number, month:number, firstday:number):Observable<IInformations[]>{
    console.log(month)
    return this.http.get<IInformations[]>(`${this.url}${this.urlInformations}/${year}/${month}/${firstday}`, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getPayments():Observable<Ipayment[]>{
    return this.http.get<Ipayment[]>(this.url + this.urlpayments, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getPaymentsPerMonthPayed(month:string|number, year:number):Observable<ItotalPayed[]>{
    return this.http.get<ItotalPayed[]>(`${this.url}${this.urlpaymentsTotal}/${month}/${year}`, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }
  getPaymentsWaiting():Observable<number>{ 
    return this.http.get<number>(`${this.url}${this.urlpaymentsTotal}/wait`, {headers: new HttpHeaders({
      'Accept': 'application/json',
    })})
  }

}