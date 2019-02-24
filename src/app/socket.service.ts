import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { catchError,tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private baseUrl = 'https://chatapi.edwisor.com';
  private socket;

  constructor(public httpClient : HttpClient) {
    //connection is being created
    //handshake happens here
    this.socket = io(this.baseUrl);
  }

  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data)=>{
        console.log(data);
        observer.next(data);
      }); //end socket
    }); //end observable
  }

  public onLineUserList = () =>{
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList)=>{
        observer.next(userList);
      });
    });
  }

  public disconnectedSockets = () =>{
    return Observable.create((observer) => {
      this.socket.on('disconnect', () =>{
        observer.next();
      });
    });
  }

  public setUser = (authToken) => {
    this.socket.emit('set-user', authToken);
  }

  private httpError = (err:HttpErrorResponse) => {
    let errMessage = '';
    if(err.error instanceof Error){
      errMessage = `An error occured: ${err.error.message}`;
    }
    else{
      errMessage = `Server sent an error code: ${err.status}, error message is: ${err.message}`;
    }
    return Observable.throw(errMessage);
  }
}
