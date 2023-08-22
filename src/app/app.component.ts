import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import {register} from 'swiper/element/bundle';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'melo_active_front';
  constructor(private router: Router){

  }
  ngAfterViewInit(): void {
    register();
  }
  goToHome(){
    this.router.navigate(['home']);
  }
}
