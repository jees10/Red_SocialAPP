import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {EventSourcePolyfill} from 'ng-event-source';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  backend_url="http://localhost:100"

  constructor() { }

  public notificador():Observable<any>{
    return Observable.create((observer)=>{
      const url: any = this.backend_url+'/mensajes/notification/sse';
      const eventSource = new EventSourcePolyfill(url,{
        heartbeatTimeout: 30000,
        connectionTimeout: 60000
      }
      );
      eventSource.addEventListener('mensaje-result',function(event:any){
        observer.next(event.data);
      });

      eventSource.addEventListener('hearbeat-result',function(){
        console.log('eventSource.addEventListener: on hearbeat....');
      });
      return () => eventSource.close();
    })
  }
}
