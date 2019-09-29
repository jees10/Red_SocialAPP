import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Amigos } from '../models/amigos';
import { cordovaPropertyGet } from '@ionic-native/core';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backend_url = "http://localhost:100/"


  constructor(private http:HttpClient) { }

async getUsers(){
  console.log("backend url",this.backend_url)
  return this.http.get<User[]>(`${this.backend_url}usuarios/`).toPromise();
}

async getAmigos(correo:string){
  return this.http.get<Amigos[]>(`${this.backend_url}amigos/lista/${correo}`).toPromise();
}

async solicitud(sol:Solicitud){
  return this.http.post<boolean>(`${this.backend_url}solicitudes/`,sol).toPromise();
}





}
