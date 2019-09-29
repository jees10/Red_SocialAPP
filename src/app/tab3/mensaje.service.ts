import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Mensaje } from '../models/mensaje';
import { Amigos } from '../models/amigos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService{

  backend_url="http://localhost:100/";

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })

  constructor(private http:HttpClient) { }

  async getChats(correo:string){
    return await this.http.get<Mensaje[]>(`${this.backend_url}mensajes/chats/${correo}`).toPromise();
  }

  async getChatsInit(correo:string){
    return await this.http.get<Mensaje[]>(`${this.backend_url}mensajes/recibidos/${correo}`).toPromise();
  }

  async getAmigos(correo:string){
    return await this.http.get<Amigos[]>(`${this.backend_url}amigos/lista/${correo}`).toPromise();
  }

  sendMessage(mensaje:Mensaje){
    let url: string = this.backend_url+'mensajes/create';
    let headers: any = new HttpHeaders({
      'Content-Type':'application/json'
    });
    console.log("mesaje recibido por el servicio: ",mensaje)
    return this.http.post<boolean>(url,JSON.stringify(mensaje),{headers:headers}).toPromise();
  }

  async getMessages(id:string){
    return await this.http.get<Mensaje[]>(`${this.backend_url}mensajes/chat/${id}`).toPromise();
  }

  public Mensajes(params:any,id:string):Observable<any>{
    let url: string = this.backend_url+`mensajes/chat/${id}`;
    return this.http
    .get(url,{headers: this.httpHeaders , params:params});
  }



}
