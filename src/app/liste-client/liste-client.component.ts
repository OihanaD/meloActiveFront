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
  currentFilter: string = 'Tous';
  filteredClients:Iclientslist[]= this.clientsList;
  is_active?:boolean;
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
  goToDetailsClient(clientId:any){
    this.router.navigate(['client'],clientId);
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
        this.filteredClients = all;
        console.log(this.clientsList);

      });

  };
  applyFilter(filter: string) {
    console.log(filter);
    console.log(this.clientsList);

    if (filter === 'Tous') {
        this.currentFilter = filter;
        this.filteredClients = this.clientsList; // Afficher tous les clients
    } else {
        this.currentFilter = filter;
        this.filteredClients = this.clientsList.filter(client => client.activity.includes(this.currentFilter)); // Filtrer par activité
    }

 this.is_active =true;
}



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
