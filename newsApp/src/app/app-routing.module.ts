import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { FeaturedComponent } from './featured/featured.component';
import { RegisterPreferencesComponent } from './register-preferences/register-preferences.component';
import { SavedComponent } from './saved/saved.component';

const routes: Routes = [
  {
    path:'',
    component : HomePageComponent,
  },
  {
    path:'search-page',
    component : SearchPageComponent,
  },
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'history',
    component: HistoryComponent,
  },
  {
    path:'featured',
    component: FeaturedComponent,
  },
  {
    path:'saved',
    component: SavedComponent,
  },
  {
    path:'preferences',
    component: RegisterPreferencesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
