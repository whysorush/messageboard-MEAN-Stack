import { Component} from '@angular/core';
import { WebService } from '../../services/web.service';
import { ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
import {AuthService} from '../../services/auth.service';
// import {  MatPaginator } from '@angular/material/Paginator';

@Component({
    selector: 'messages',
    template: `
    

    <div *ngFor="let message of webService.messages | async">
        <mat-card class="card" *ngIf="auth.isAuthenticated">
        <div >

            <mat-card-title  [routerLink]="['/messages',message.owner]" style="margin-right:100%; cursor: pointer">{{message.owner}} </mat-card-title> 
            <mat-card-content >{{message.text}} </mat-card-content>
            </div>
        </mat-card>
    </div>
    `
}) 
export class MessageComponent{
            constructor(public  webService : WebService, private route: ActivatedRoute ,public auth:AuthService){}

ngOnInit(){
    
    var name = this.route.snapshot.params.name;
    this.webService.getMessages(name);
     this.webService.getUser().subscribe();

}
}