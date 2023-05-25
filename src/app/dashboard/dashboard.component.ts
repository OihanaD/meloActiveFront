import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiConnexionService } from '../api-connexion.service';
import { CommonModule } from '@angular/common';
import { SwiperDirectiveDirective } from '../swiper-directive.directive';
import { A11y, Mousewheel, Navigation, Pagination, SwiperOptions } from 'swiper';
import { catchError, of } from 'rxjs';


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
    this.getAllCoachSession();
    this.getMonth();
    this.getDay();
  }
  constructor(private service: ApiConnexionService) { }
  months: string[] = [];
  sessions: any;
  days: string[] = [];
  weeks: string[][] = [];
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  monthSession:any;





  //Configuration du swiper
  public config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    autoHeight: true,
    spaceBetween: 20,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      400: {
        slidesPerView: "auto",
        centeredSlides: false
      },
    }
  }

  getMonth() {
    for (let i = this.currentMonth; i < this.currentMonth + 12; i++) {
      //Je créer une nouvelle date
      const month = new Date();
      //Je récupère le mois de cette date avec le i du mois actuel jusqu'à 12 en plus
      month.setMonth(i);
      //Je récupère le nom du mois
      const monthName = month.toLocaleString('default', { month: 'long' });
      //je le met en lettre capital
      const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      //Je le push dans le tableau sur le quel je vais gérer l'affichage
      this.months.push(capitalizedMonthName);
    }
  }

  getDay() {
    const currentYear = this.currentDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let week: string[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(currentYear, this.currentMonth, i);
      const dayOfWeek = currentDay.toLocaleString('default', { weekday: 'long' });
      const dayOfMonth = currentDay.toLocaleString('default', { day: '2-digit' });
      const formattedDay = `${dayOfWeek} ${dayOfMonth}`;
      week.push(formattedDay);

      if (currentDay.getDay() === 0 || i === daysInMonth) {

        this.weeks.push(week);
        week = [];
      }
    }
  }


  getAllCoachSession() {
    this.service.getCoachSession()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe((sessions) => {
        this.sessions = sessions;
        console.log(sessions);
        
      });


  }
  getMonthSession(){
    this.monthSession =this.sessions.getMonth()
  }


}
