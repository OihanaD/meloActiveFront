import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iclient } from '../Interfaces/iclient';
import { ApiConnexionService } from '../api-connexion.service';
import { IdataClient } from '../Interfaces/idata-client';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  client:IdataClient[]=[];
  
  constructor(
    private route : ActivatedRoute,
    private service: ApiConnexionService,
    private router: Router){}

  ngOnInit(){
    this.getClient()
  }
  getClient(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
    this.service.getClienById(id).subscribe(
      (client:IdataClient[]) => {
        console.log(client);
        if(client.length <= 0){
          alert("Aucun Client trouvé");
          this.goToHome();
        }
        this.client = client;

        
      },
      (error) => {
        console.log(error);
      }
      );
   }
  }
  goToHome(){
    this.router.navigate(['home']);
  }
  formatDateTime(dateString: Date): string {
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
