import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { ListeClientComponent } from './liste-client/liste-client.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailClientComponent,
    ListeClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
