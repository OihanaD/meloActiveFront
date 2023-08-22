import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConnexionService } from '../api-connexion.service';
import { catchError, of } from 'rxjs';
import { Iclientslist } from '../Interfaces/iclientslist';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.scss']
})
export class ListeClientComponent implements OnInit {
  clientsList: Iclientslist[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: ApiConnexionService,
    private router: Router) { }
  ngOnInit() {
    this.getClientsInfos();
  }
  goToHome(){
    this.router.navigate(['home']);
  }
  getClientsInfos() {
    this.service.getClients()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe((all: Iclientslist[]) => {
        this.clientsList = all;
        console.log(this.clientsList);

      });

  };
  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Les mois sont indexés à partir de 0
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}/${formattedMonth}/${year}`;
  }
}
