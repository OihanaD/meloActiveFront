import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConnexionService } from '../api-connexion.service';
import { catchError, of } from 'rxjs';
import { Iclientslist } from '../Interfaces/iclientslist';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clients: any;
  clientId?: number|string;
  message?: string;
  clientsName = [];
  selectedClientName?: string;
  selectedActivity?: string;
  successMessage?: boolean;
  activities?: any;

  constructor(private service: ApiConnexionService, private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllClientsInfos();
  }
  profileForm = new FormGroup({
    clientId: new FormControl(''),
    activity: new FormControl(''),
    objectif: new FormControl(''),
    price: new FormControl(''),
    date: new FormControl('')
  });


  getAllClientsInfos() {
    this.service.getAllClients()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe((all: any) => {
        this.clients = all;
        console.log(all);
        const filteredClients = all.filter((item: any) => item.user);
        const clientNames = filteredClients.map((client: any) => client.user.name);
        this.clientsName = clientNames;

        this.activities = all.map((client: any) => client.activity);
        console.log(this.activities);

        // Créer un ensemble (Set) pour stocker les activités uniques
        const uniqueActivities = new Set();

        // Parcourir toutes les activités et ajouter leur nom à l'ensemble (en excluant ceux avec "|")
        this.activities.forEach((activity:any) => {
          if (!activity.includes("|")) {
            uniqueActivities.add(activity);
          }
        });

        // Convertir l'ensemble en tableau pour obtenir les activités uniques
        this.activities = Array.from(uniqueActivities);

      });

  };


  onSubmit() {
    //Je récupère le nom du client
    const clientName = this.selectedClientName;
    //Je recherche le client dans ma liste de client
    const foundClient = this.clients.find((client: any) => {
      //Si le a un user et que son nom correspond à ma valeur je retourne vrai
      if (client.user && client.user.name === clientName) {
        return true;
      }
      //Sinon je retourn false
      return false;
    });

    if (foundClient) {
      //J'attribue l'id du client 
      this.clientId = foundClient.id;
    }
    //Je reemt ma valeur en string dans mon retour de formulaire
    this.profileForm.value.clientId = this.clientId?.toString();

    //Je l'envoie en post dans mon api
    this.service.addSession(this.profileForm.value);
    this.successMessage = true;
    this.message = 'Séance ajoutée avec succès';
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }

  cancel(){
    this.profileForm.reset();
  }
}
