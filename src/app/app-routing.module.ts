import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { AddSeanceComponent } from './add-seance/add-seance.component';
// import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: LoginComponent },
  {path:'home', component:DashboardComponent},
  {path: 'clients', component:ListeClientComponent},
  {path:'seance/add', component:AddSeanceComponent},
  {path:'client/:id', component:DetailClientComponent},
  {path:'', redirectTo: 'home',pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
