import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/estado';



@Injectable({
  providedIn: 'root'
})
export class PostsService {

  backend_url ="http://localhost:100/estados";

  constructor(private http:HttpClient) { }


    async mis_estados(correo: String){
      return this.http.get<Estado[]>(`${this.backend_url}/misEstados/${correo}`).toPromise();
    }

}
