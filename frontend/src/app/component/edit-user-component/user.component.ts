import { Component} from '@angular/core'
// import * as EventEmitter from 'events';
import { WebService } from '../../services/web.service';
// import { Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'user',
    template: 
    `<mat-card class="card">
        <mat-card-content>
            <mat-form-field>
             <input [(ngModel)]="model.firstName" matInput placeholder= "firstName">
            </mat-form-field>
            <mat-form-field>
            <input [(ngModel)]="model.lastName" matInput placeholder= "lastName">
           </mat-form-field>
           <mat-card-actions> 
           <button (click)="post()" mat-button color="accent">Save changes</button>
           </mat-card-actions>
        </mat-card-content>
    </mat-card>
    `
    
}) 
export class UserComponent{

    // @Output() onPosted = new EventEmitter();
constructor(private webService : WebService){}

model ={
    firstName: "",
    lastName: ""
}
ngOnInit(){
    this.webService.getUser().subscribe (res =>{
        this.model.firstName = res.firstName;
        this.model.lastName = res.lastName;
    })  
}
 
post(){
    this.webService.saveUser(this.model).subscribe();
    // this.onPosted.emit(this.message);
}



    
}