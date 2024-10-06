import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import { AuthGuard } from './auth.guard'; 
import {ProfileComponent} from './Components/profile/profile.component';
import { ChatComponent } from './Components/chat/chat.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'main', component: BasePageComponent ,canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent },
  { path: 'chats', component: ChatComponent },
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

