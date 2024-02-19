import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  {path:"", component: LandingComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "contact", component: ContactComponent},
  {path: "user-dashboard", component: UserDashboardComponent, children:[
    {path: 'history', component: HistoryComponent},
    {path: 'profile', component:ProfileComponent},
    {path: 'reviews', component: ReviewsComponent}
  ]},
  {path: "admin-dashboard", component: AdminDashboardComponent, children: [
    {path: 'users', component: UsersComponent}
  ]},
  {path: "**", component: NotFoundComponent}
];
