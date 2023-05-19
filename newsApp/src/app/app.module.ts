import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoryComponent } from './history/history.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FeaturedComponent } from './featured/featured.component';
import { RegisterPreferencesComponent } from './register-preferences/register-preferences.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HomePageComponent,
    RegisterComponent,
    HistoryComponent,
    LoginComponent,
    FeaturedComponent,
    RegisterPreferencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
