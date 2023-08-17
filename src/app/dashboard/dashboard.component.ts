import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiConnexionService } from '../api-connexion.service';
import { CommonModule, WeekDay } from '@angular/common';
import { SwiperDirectiveDirective } from '../swiper-directive.directive';
import { A11y, Mousewheel, Navigation, Pagination, SwiperOptions } from 'swiper';
import { catchError, empty, of } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SwiperDirectiveDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    // this.getSessionsPerDateCoachSession();
    this.getDaysOfMonth();
    // this.getClientsCoachingSession(); 
    this.getSessionsPerDate();
    this.getPayments();
    this.getPaymentsPerMonth();
    this.getPaymentsWaiting();

  }
  constructor(private service: ApiConnexionService) { }


  sessions: any;
  currentDate = new Date();
  currentMonth: any = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
  currentMonthNumber:any;
  currentYear: number = this.currentDate.getFullYear();
  monthSession: any = [];
  yearSession: any = [];
  daySession: any = [];
  daysOfMonth: any[] = [];
  goodMonth: any;
  dateOfMonth: any = [];
  informations: any = [];
  payments:any = [];
  clientPayment:any = [];
  totalPayed:any = [];
  totalWait?:number;

  getSessionsPerDate() {
    this.service.getSessionsPerDate(this.currentYear, "0"+this.currentMonthNumber, this.daysOfMonth[0])
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe((all: any) => {        
        this.informations = all;
      });
    
  };

  getPayments(){
    
    this.service.getPayments()
    .pipe(
      catchError((error)=>{
        console.log(error);
        return of([]);
      })
    )
    .subscribe((payment:any)=>{
    this.payments = payment;
    
    })
    
  }
  getPaymentsPerMonth(){
    
    this.service.getPaymentsPerMonthPayed(("0"+this.currentMonthNumber), this.currentYear)
    .pipe(
      catchError((error)=>{
        console.log(error);
        return of([]);
      })
    )
    .subscribe((totalpayed:any)=>{
      console.log(totalpayed);
      console.log('mois' + this.currentMonthNumber);
     this.totalPayed =  totalpayed;
    
    })
    
  }
  getPaymentsWaiting(){
    
    this.service.getPaymentsWaiting()
    .pipe(
      catchError((error)=>{
        console.log(error);
        return of([]);
      })
    )
    .subscribe((totalwait:any)=>{
      totalwait.forEach((total:any) => {
        this.totalWait = total.total_wait_amount
      });      
    
    })
    
  }
  getMonthLetter(dateString: Date): string {
    const date = new Date(dateString)
    const monthLetter = date.toLocaleString('fr-FR', { month: 'long' });
    return monthLetter;
  }
  getMonthNumber(monthString: any): string{
    const monthNames = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
  
    const monthIndex =monthNames.findIndex(month => month === monthString.toLowerCase());
  
    if (monthIndex !== -1) {
      return "0" + (monthIndex +1).toString();
    } else {
      return -1 + "0"; // Mois non trouvé
    }
  }

  getYear(date: Date):number{
    const newDate = new Date(date);
    return newDate.getFullYear();
  }
  
  //**********************************************Planner***************************************************************//

  getDaysOfMonth() {
    //Je récupère la date du jour
    const startOfWeek = new Date(this.currentDate);
    //Je récupère le numéro de la semaine de la date du jour via la fonction get day
    const diff = this.currentDate.getDay() - 1;
    //différence entre le jour de la semaine actuel et 1 pour récupérer le lundi
    startOfWeek.setDate(this.currentDate.getDate() - diff);

    const weekDays: number[] = [];
    //Je récupère le mois actuel
    const currentMonth = this.currentDate.getMonth();
    //tant que la semaine est - que 7
    while (weekDays.length < 7) {
      //date créée à partir de la date de début de la semaine 
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
      //Si le mois est le currentmonth 
      if (date.getMonth() === currentMonth) {
        //Je push la date dans mon tableau weekDays
        weekDays.push(date.getDate());
      }
      //J'ajoute 1 à la date 
      startOfWeek.setDate(startOfWeek.getDate() + 1);
    }
    this.currentMonthNumber = currentMonth+1
    
    
    //j'attribut le weekdays à la variable daysOfMonth
    return this.daysOfMonth = weekDays;
  }
  goToPreviousWeek() {
    //Je récupère la date d'aujourd'hui
    const currentDay = this.currentDate.getDate();
    //J'anlève 7 J à ma date
    this.currentDate.setDate(currentDay - 7);
    //Je gère le cas où il n'y a changement de mois
    if (this.currentDate.getMonth() !== this.currentMonth - 1) {
      //J'enlève 1 au mois
      this.currentMonth = this.currentDate.getMonth() - 1;
      this.currentMonthNumber = this.currentDate.getMonth() - 1;
      //Je le transforme en mots
      this.currentMonth = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
    }
    //Je récupère l'année
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonthNumber +=2;
    
    
    
    //J'appelle les fonctions
    this.getDaysOfMonth();
    this.getSessionsPerDate();
    this.getPaymentsPerMonth();

    
  }

  goToNextWeek() {
    const currentDay = this.currentDate.getDate();
    this.currentDate.setDate(currentDay + 7);
    if (this.currentDate.getMonth() !== this.currentMonth - 1) {
      this.currentMonth = this.currentDate.getMonth() + 1;
      this.currentMonth = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
    }
    this.currentYear = this.currentDate.getFullYear();
    this.getDaysOfMonth();
    this.getSessionsPerDate();
    this.getPaymentsPerMonth();

  }
  goToPreviousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentMonth = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();

    this.getDaysOfMonth();
    this.getSessionsPerDate();
    this.getPaymentsPerMonth();

    

  }

  goToNextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentMonth = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();

    this.getDaysOfMonth();
    this.getSessionsPerDate();
    this.getPaymentsPerMonth();

    
  }
  getDayOfWeek(index: number): string {
    const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const dayIndex = (index + 1) % 7;
    return weekDays[dayIndex];
  }

}
