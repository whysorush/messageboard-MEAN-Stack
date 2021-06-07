import { Component} from '@angular/core'
// import * as EventEmitter from 'events';
import { WebService } from './web.service';
// import { Output, EventEmitter } from '@angular/core';
import {AuthService} from './auth.service';



@Component({
    selector: 'new-message',
    template: 
    `<mat-card class="card">
        <mat-card-content>
           
            <mat-form-field>
            <textarea [(ngModel)]="message.text" matInput placeholder= "Message"></textarea>
           </mat-form-field>
           <mat-card-actions> 
           <button (click)="post()" *ngIf="auth.isAuthenticated" mat-button color="accent">POST</button>

           <button routerLink="/login" *ngIf="!auth.isAuthenticated" mat-button color="accent">Login</button>
          
           </mat-card-actions>
        </mat-card-content>
    </mat-card>
    `
    
}) 
export class NewMessageComponent{

    // @Output() onPosted = new EventEmitter();
constructor(private webService : WebService, public auth:AuthService){}

message ={
    owner: this.auth.name,
    text: ""
}

post(){
    this.webService.postMessage(this.message);
    // this.onPosted.emit(this.message);
}



    
}