import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasePageComponent } from './base-page/base-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { jqxNavBarModule } from 'jqwidgets-ng/jqxnavbar';
import { DoctorComponent } from './Components/doctor/doctor.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ContentComponent } from './Components/content/content.component';
import { AuthService } from './auth.service';
import { ChatComponent } from './Components/chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BasePageComponent,
    NavbarComponent,
    DoctorComponent,
    ProfileComponent,
    ContentComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    jqxNavBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
