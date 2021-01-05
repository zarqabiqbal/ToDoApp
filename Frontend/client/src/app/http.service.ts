import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpClientJsonpModule, HttpParams } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {http_url as HTTP_URL} from './global';
import { JsonPipe } from '@angular/common';
import { TodopageComponent } from './todopage/todopage.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      // errorMessage = `Error: ${error.error.message}`;
      errorMessage = `Server Error`;
    } else {
      // Server-side errors
      errorMessage = `Server Error`;
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  user_login(user_email,user_pass){
    var body= new HttpParams();
    body=body.set('user_email',user_email);
    body=body.set('user_pass',user_pass);
    return this.httpClient.post<JSON>(HTTP_URL+'user_login',body).pipe(retry(1),catchError(this.handleError))
  }
  user_add(data){
    let body = JSON.stringify(data);
    return this.httpClient.post<JSON>(HTTP_URL+'user_add',body,{headers: this.headers}).pipe(retry(1),catchError(this.handleError))
  }

  change_pass(user_email,old_pass,new_pass){
    var body= new HttpParams();
    body=body.set('user_email',user_email);
    body=body.set('old_pass',old_pass);
    body=body.set('new_pass',new_pass);
    return this.httpClient.post<JSON>(HTTP_URL+'reset_password',body).pipe(retry(1),catchError(this.handleError))

  }

  get_todo_list(email,password){
    let body = JSON.stringify({"user_email":email,"user_pass":password})
    return this.httpClient.post<Array<JSON>>(HTTP_URL+'user_todo',body,{headers: this.headers}).pipe(retry(3),catchError(this.handleError))
  }

  add_todo(email,password,todo){
    let body = JSON.stringify({"user_email":email,"user_pass":password,"todo":todo})
    return this.httpClient.post<Array<JSON>>(HTTP_URL+'add_todo',body,{headers: this.headers}).pipe(retry(3),catchError(this.handleError))
  }

  remove_todo(email,password,toDoId){
    let body = JSON.stringify({"user_email":email,"user_pass":password,"toDoId":toDoId})
    return this.httpClient.post<Array<JSON>>(HTTP_URL+'remove_todo',body,{headers: this.headers}).pipe(retry(3),catchError(this.handleError))
  }
}