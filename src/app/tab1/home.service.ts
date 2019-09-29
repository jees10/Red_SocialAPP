import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Estado } from '../models/estado';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  backend_url="http://localhost:100/estados"
  
  estados$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http:HttpClient, private globalService
    :AuthService) { }

  refeshEstados(correo:String){
    this.estados(correo).then(estatus => this.estados$.next(estatus));
  }
  
  async create_estado(estado:any){
    return this.http.post(`${this.backend_url}/`,estado).toPromise();
  }

  async mis_estados(correo: String){
    return this.http.get<Estado[]>(`${this.backend_url}/misEstados/${correo}`).toPromise();
  }

  async estados(correo:String){
    return this.http.get<Estado[]>(`${this.backend_url}/amigos/${correo}`).toPromise();
  }

  async name(correo:String){
    return this.http.get<User>(`http://localhost:100/usuarios/correo/${correo}`).toPromise();
  }

  async like(estado:any){
    return this.http.put<boolean>(`${this.backend_url}/like/${estado.id}`,estado).toPromise();
  }

  logout(){
    this.globalService.logOut();
  }


}
