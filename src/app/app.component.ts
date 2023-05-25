import { AfterViewInit, Component } from '@angular/core';
import {register} from 'swiper/element/bundle';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'melo_active_front';
  ngAfterViewInit(): void {
    register();
  }
}
