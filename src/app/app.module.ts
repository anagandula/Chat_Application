import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './chat.service';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ChatModule,
    UserModule,
    RouterModule.forRoot([
      {path: 'login', component:LoginComponent, pathMatch: 'full'},
      {path: '', redirectTo:'login', pathMatch: 'full'},
      {path: 'signup', component:SignupComponent},
      {path: 'chat', component:ChatBoxComponent},
      {path: '*', component:LoginComponent},
      {path: '**', component: LoginComponent}
    ])
  ],
  providers: [ChatService,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
