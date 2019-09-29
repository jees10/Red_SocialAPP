import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MensajeService } from './mensaje.service';
import { Mensaje } from '../models/mensaje';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/User';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  mensajes:Mensaje[]=[];
  mensajes2:Mensaje[]=[];
  ciclo=timer(1000,1000).pipe(take(5000));
  subscripcion:Subscription;

  constructor(private toast:ToastController,
              private service:MensajeService,
              private router:Router) {
              }

getUser(){
  let user = localStorage.getItem('user');
  return JSON.parse(user);
}              

getChats(correo:string){  
this.service.getChats(correo).then(data =>{
  this.eliminar(data,'recibidor');
},error=>{
  console.log(error);
})
}

getRecibedChat(correo:string){
this.service.getChatsInit(correo).then(data =>{
  this.eliminar2(data,'remitente');
},err =>{
  console.log(err);
})
}

eliminar(arr:Mensaje[],prop:string){
  let nuevoArray = [];
  let lookup={};

  for(let i in arr){
    lookup[arr[i][prop]] = arr[i];
  }

  for(let i in lookup){
    nuevoArray.push(lookup[i])
  }

  this.mensajes = nuevoArray;
  
}

eliminar2(arr:Mensaje[],prop:string){
  let nuevoArray = [];
  let lookup={};

  for(let i in arr){
    lookup[arr[i][prop]] = arr[i];
  }

  for(let i in lookup){
    nuevoArray.push(lookup[i])
  }

  this.mensajes2 = nuevoArray;
  
}


  ngOnInit(){
    let user = this.getUser();
    this.getChats(user.correo);
    
  }

  chat(canal:string,recibidor:string){
    let pre:any ={
      canal:canal,
      recibidor:recibidor
    }
    localStorage.setItem('pre',JSON.stringify(pre));    
    this.router.navigateByUrl('chat');
  }

  actualizar(){
    let user:User = this.getUser();
    this.subscripcion = this.ciclo.subscribe(n =>{
      this.getChats(user.correo);
      this.getRecibedChat(user.correo);
      
    })
  }

  ionViewWillLeave(){
    this.subscripcion.unsubscribe();
  }
  
  ionViewWillEnter(){
  this.actualizar();
  }


}
