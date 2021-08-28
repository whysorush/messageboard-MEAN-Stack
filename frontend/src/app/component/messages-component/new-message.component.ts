import { Component} from '@angular/core'
// import * as EventEmitter from 'events';
import { WebService } from '../../services/web.service';
// import { Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
    selector: 'new-message',
    template: 
        `
        <mat-card class="card">
        <mat-card-content>
           
            <mat-form-field>
            <textarea [(ngModel)]="message.text" matInput placeholder= "Message" #input required ></textarea>
           </mat-form-field>
           <mat-card-actions> 
           <button [disabled]="!message.text && !isDisabled" (click)="post()"  *ngIf="auth.isAuthenticated" mat-button color="accent" >
                
           <span *ngIf='!message.text' #input required>Type something to send mssage</span>
           <mat-icon 
                *ngIf='message.text && !isDisabled' >
                    POST
                </mat-icon></button>
           <button routerLink="/login" *ngIf="!auth.isAuthenticated" mat-button color="accent">Login to send message</button>
          
           </mat-card-actions>
        </mat-card-content>
    </mat-card>
    `
    
}) 
export class NewMessageComponent{

constructor(private webService : WebService, public auth:AuthService ,private sb: MatSnackBar){}
isDisabled = false;

message ={
    owner: this.auth.name,
    text: ""
}
// openSnackBar(message: 'string', action: 'string'){
//     this.sb.open(message, action);
// }

post(){
    
    let ownerList: string[] =[];
  this.webService.messagesLimit.forEach(element => {
        
        ownerList.push(element.owner) ;
    });   
     
    if(ownerList[ownerList.length - 1] != this.auth.name || ownerList[ownerList.length-1] != ownerList[ownerList.length - 2] ){

         this.isDisabled = !this.isDisabled
    }
   
    else if(ownerList[ownerList.length-1] == this.auth.name ){
       
        this.isDisabled =  this.isDisabled
    }
    else{
        console.log("hello")
    }
  
    // console.log("hello", this.message)
if(this.message.owner == ownerList[ownerList.length - 1]){

this.isDisabled =  this.isDisabled;

this.sb.open("Hello There! Wait for other participant to reply",'close',{duration:5000});
// alert("Hello There! Wait for other participant to reply");

}
else{
    // console.log(this.webService.messagesLimit)
    this.webService.postMessage(this.message);
    this.message.text = '';
    
    var newArray = [];
    newArray.push(ownerList[0]);
    this.sb.open("Hello There! Message updated succesfully",'close', {duration:3000});
}

}

}