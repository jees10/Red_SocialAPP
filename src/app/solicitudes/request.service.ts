import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Solicitud } from '../models/solicitud';
import { Amigos } from '../models/amigos';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  backend_url = "http://localhost:100";

  constructor(private http:HttpClient) { }

async Request(correo:string){
  //solicitudes enviadas
  return await this.http.get<Solicitud[]>(`${this.backend_url}/solicitudes/misSolicitudes/${correo}`).toPromise();
}


async deleteRequest(id:string){
  return await this.http.delete<boolean>(`${this.backend_url}/solicitudes/borrar/${id}`).toPromise();
}
  
async myRequest(correo:string){
  //solicitudes recibidas
  return await this.http.get<Solicitud[]>(`${this.backend_url}/solicitudes/enviadas/${correo}`).toPromise();
}

async addAmigo(amigo:Amigos){
return await this.http.post<boolean>(`${this.backend_url}/amigos/`,amigo).toPromise();
}

async getName(correo:string){
return this.http.get<User>(`${this.backend_url}/usuarios/correo/${correo}`).toPromise();
}

}
