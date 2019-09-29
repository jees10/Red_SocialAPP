import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';
import { Solicitud } from '../models/solicitud';
import { Amigos } from '../models/amigos';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/User';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  constructor(private service:RequestService,
              private toast: ToastController,
              private router:Router) { 
              }

  solicitud:Solicitud[]=[];
  validador:boolean = false;
  username: any;
  ciclo = timer(1000,1000).pipe(take(5000));
  subscripcion:Subscription;

  ngOnInit() {
    let user = this.getUser();
    this.getMyRequests(user.correo);
    this.validador = true;
  }

  actualizar(){
    let user:User = this.getUser();
    this.subscripcion = this.ciclo.subscribe(n=>{
      this.getMyRequests(user.correo);
    })
  }

  getUser(){
    let user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  
  async getMyRequests(correo:string){
    //solicitudes recibidas
    await this.service.myRequest(correo).then(sol =>{      
      this.solicitud = sol;
      this.solicitud.forEach(s => {
        this.getName(s.correo);
      });
    }, error =>{
      console.log(error);
    })
  }

  async add(nombreAmigo:string,correoAmigo:string,id:string){
    let user = this.getUser();
    let amigo:Amigos ={
      id:"",
      amigo:nombreAmigo,
      correoAmigo:correoAmigo,
      correo:user.correo
    }
    console.log('amigo: ',amigo);
    let amigos2:Amigos={
      id:"",
      amigo:user.nombre,
      correoAmigo:user.correo,
      correo:correoAmigo
    }
    console.log('amigo2: ',amigos2);
    try {
      await this.service.addAmigo(amigo);
      await this.service.addAmigo(amigos2);
      await this.service.deleteRequest(id);
      const toast= await this.toast.create({
        message:`${nombreAmigo} agregado a tus amigos`,
        duration: 2000
      });
      toast.present();
    } catch (error) {
      console.log(error)
    }
  }

 async get(){
   this.validador = true;
   console.log(this.validador);
    this.solicitud = null;
    let user = this.getUser();
    await this.getMyRequests(user.correo);
    
  }

  async getName(correo:string){
    try {
      await this.service.getName(correo).then(data =>{
        this.username = data;
      })
    } catch (error) {
      console.log(error);
    }
  }

  ionViewWillLeave(){
    this.subscripcion.unsubscribe();
  }
  
  ionViewWillEnter(){
  this.actualizar();
  }
  
}
