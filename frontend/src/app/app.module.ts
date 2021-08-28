import { NgModule } from '@angular/core';
import{ RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './component/messages-component/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import{ MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl} from '@angular/material/form-field';
// import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';


import { ReactiveFormsModule } from '@angular/forms';
import { WebService } from './services/web.service';
import { AuthService } from './services/auth.service'
import{ HttpModule } from '@angular/http';
import {NewMessageComponent} from './component/messages-component/new-message.component';
import {FormsModule} from '@angular/forms';
import { NavComponent } from './component/nav-component/nav.component';
import {HomeComponent} from './home.component';
import {RegisterComponent} from './component/register-component/register.component';
import {LoginComponent} from './component/login-component/login.component';
import {UserComponent} from './component/edit-user-component/user.component';
import {MessageServerComponent} from './component/message-server-component/message-server.component';
import {MessageBoardComponent} from './component/messages-component/message-board.component';




import { from } from 'rxjs';

var routes = [
  {
  path: '',
  component : HomeComponent
},

{
  path: 'group',
  component : MessageServerComponent
},

{
  path: 'board',
  component : MessageBoardComponent
},
{
  path: 'messages',
  component : MessageComponent
},
{
  path: 'messages/:name',
  component : MessageComponent
},
{
  path: 'register',
  component : RegisterComponent
}   ,
{
  path: 'login',
  component : LoginComponent
},
{
  path: 'user',
  component : UserComponent
}    

];

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NewMessageComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    MessageServerComponent,
    MessageBoardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule ,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    // MatPaginatorModule,
    // MatFormFieldControl,
    HttpModule,
    FormsModule ,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// function forRoot(routes: any[]): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
//   throw new Error('Function not implemented.');
// }

