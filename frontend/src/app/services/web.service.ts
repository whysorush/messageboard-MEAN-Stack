import{ Http } from '@angular/http';
// import {Observable} from 'rxjs';  
import 'rxjs'  
// import { Observable } from 'rxjs/observable' 
import{ Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import {AuthService} from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()

export class WebService{
BASE_URL = 'http://localhost:2000/api';

private messageStore =[{owner :'',text:''}];

private messageSubject = new Subject<any[]>();

messages = this.messageSubject.asObservable();
messagesLimit = [{owner :'',text:''}];

constructor(private http: Http , private sb : MatSnackBar ,private auth: AuthService  ){
  this.getMessages(user);
}

     getMessages(user: any){

        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/messages'+ user).subscribe(response =>{
        
          this.messageStore = response.json();
          this.messagesLimit=this.messageStore
          // console.log(this.messagesLimit)
        this.messageSubject.next(this.messageStore);
          
        }, error =>{
          this.handleError("unable to get message");
        })
        
      
      
    }
    async postMessage(message : any){
      try {
        var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise(); 
      
      this.messageStore.push(response.json());
      this.messageSubject.next(this.messageStore);
      } catch (error) {
        this.handleError("unable to post message");
      }
      
    }

    getUser(){
      return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).pipe(map((res: any) => res.json()))
    }

    saveUser(userData:any){
      return this.http.post(this.BASE_URL + '/users/me',userData, this.auth.tokenHeader).pipe(map((res: any) => res.json()))
    }


    private handleError(error:any){
      console.error(error)
        this.sb.open(error,'close', {duration:2000});
      
    }
} 

function user(user: any) {
  throw new Error('Function not implemented.');
}
