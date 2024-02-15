import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  {path:"", component: LandingComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent}
];
