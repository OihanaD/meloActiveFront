import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { ListeClientComponent } from './liste-client/liste-client.component';

const routes: Routes = [
  {path:'home', component:DashboardComponent},
  {path: 'clients', component:ListeClientComponent},
  {path:'client/:id', component:DetailClientComponent},
  {path:'', redirectTo: 'home',pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
