import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backenUrl = "http://localhost:100/usuarios";

  constructor(private http: HttpClient, public toast:ToastController) { }

  getUser():any{
    try {
      let user = localStorage.getItem('user');
      return JSON.parse(user);
    } catch{
      return null;
    }
  }


  async login(login_data: {clave:String, correo:String}){
    try {
      const response = await this.http.post(`${this.backenUrl}/login?clave=${login_data.clave}&correo=${login_data.correo}`,{}).toPromise();
      localStorage.setItem('user',JSON.stringify(response));
      let user = this.getUser();
      const toast = await this.toast.create({
        message:`¡Bienvenido(a) ${user.nombre}`,
        duration:2500
      });
      toast.present();
    } catch (error) {
      let errMsg = error.status == 403 ?
        `correo o contraseña incorrecto`:'!correo o contraseña incorrectos!'
      const toast = await this.toast.create({
        message: errMsg,
        duration:4000
      });
      toast.present()
      return false;
    }
  }


  async logOut(){
    localStorage.setItem('user',null);
  }

  get isLoggedIn(): boolean {
    return !! this.getUser();
  }


  async create_user(user: any){
    return this.http.post<boolean>(`${this.backenUrl}/`,user).toPromise();
  }


}


