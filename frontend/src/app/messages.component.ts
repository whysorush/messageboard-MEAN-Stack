import { Component} from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
import {AuthService} from './auth.service';

@Component({
    selector: 'messages',
    template: `
    <div *ngFor="let message of webService.messages | async">
        <mat-card class="card" *ngIf="auth.isAuthenticated">
        <div >

            <mat-card-title style="align-content: right;" [routerLink]="['/messages',message.owner]" style="cursor: pointer">{{message.owner}} </mat-card-title> 
            <mat-card-content > by {{message.text}} </mat-card-content>
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