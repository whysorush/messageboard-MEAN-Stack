import { Component } from '@angular/core';
import{ NavComponent } from './component/nav-component/nav.component';

@Component({
  selector: 'my-app',
  template: `<nav></nav>
           <router-outlet></router-outlet>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

 }
