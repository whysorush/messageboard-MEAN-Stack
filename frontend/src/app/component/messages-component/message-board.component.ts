import { Component } from '@angular/core';
import { MessageComponent } from './messages.component';
import { NewMessageComponent } from './new-message.component'
import{ NavComponent } from '../nav-component/nav.component';

@Component({
  selector: 'board',
  template: `
        
        <new-message></new-message>
        <messages><messages>
    `,
  styleUrls: ['./app.component.css']
})
export class MessageBoardComponent { 

 
 }
