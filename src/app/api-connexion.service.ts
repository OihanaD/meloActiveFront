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
import { Iclientslist } from './Interfaces/iclientslist';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSeanceComponent } from './add-seance/add-seance.component';

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
  private clientList = "/api/client/infos";

 private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };
  
  getClients(): Observable<Iclientslist[]> {
    return this.http.get<Iclientslist[]>(`${this.url}${this.clientList}`,  this.httpOptions)
  }
  getAllClients(): Observable<any> {
    
    return this.http.get<any>(`${this.url}${this.urlClients}`, this.httpOptions)
  }
  getClienById(id:string):Observable<IdataClient[]>{
    return this.http.get<IdataClient[]>(`${this.url}${this.urlClient}/${id}`,this.httpOptions)
  }
  getCoachSession(): Observable<ICoachingSession[]> {
    const currentYear = new Date().getFullYear();
    return this.http.get<ICoachingSession[]>(this.url + this.urlCoachSession,this.httpOptions).pipe(
      map(sessions => sessions.filter(session => {
        const sessionYear = new Date(session.date_session).getFullYear();
        return sessionYear === currentYear;
      }))
    );
  }
  getClientsCoachingSessions(): Observable<IClientsCoachingSession[]> {
    return this.http.get<IClientsCoachingSession[]>(this.url+this.urlClientCoachSession, this.httpOptions)
  }
  getCoach(): Observable<Icoach[]> {
    return this.http.get<Icoach[]>(this.url + this.urlCoach,this.httpOptions)
  }
  getSessionsPerDate(year:number, month:number, firstday:number):Observable<IInformations[]>{
    return this.http.get<IInformations[]>(`${this.url}${this.urlInformations}/${year}/${month}/${firstday}`, this.httpOptions)
  }
  getPayments():Observable<Ipayment[]>{
    return this.http.get<Ipayment[]>(this.url + this.urlpayments, this.httpOptions)
  }
  getPaymentsPerMonthPayed(month:string|number, year:number):Observable<ItotalPayed[]>{    
    return this.http.get<ItotalPayed[]>(`${this.url}${this.urlpaymentsTotal}/${month}/${year}`,this.httpOptions)
  }
  getPaymentsWaiting():Observable<number>{ 
    return this.http.get<number>(`${this.url}${this.urlpaymentsTotal}/wait`,this.httpOptions)
  }

  addSession(data:any):any{
     this.http.post(this.url +'/api/session/adding', data).subscribe((result)=>
     console.warn(result));
  }


}