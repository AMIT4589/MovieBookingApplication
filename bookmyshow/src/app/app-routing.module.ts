import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { MovieComponent } from './components/movie/movie.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { HomeComponent } from './components/home/home.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
  {path:'dashboard/movie',component:MovieComponent},
  {path:'dashboard/ticket',component:TicketComponent},
  {path:'home',component:HomeComponent},
  {path:'reset',component:ResetComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
