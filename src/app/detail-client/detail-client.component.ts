import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private route : ActivatedRoute, private service: ApiConnexionService){}

  ngOnInit(){
    this.getClient()
  }
  getClient(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
    this.service.getClienById(id).subscribe(
      (client:IdataClient[]) => {
        console.log(client);
        
        this.client = client;

        
      },
      (error) => {
        console.log(error);
      }
      );
   }
  }
}
