import { Component, OnInit,OnDestroy } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { Estado } from '../models/estado';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/User';

 



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  estados: Estado[];
  estado:Estado[];
  username: any;
  ciclo = timer(1000,1000).pipe(take(5000))
  subscripcion:Subscription;

  constructor(private service: HomeService, private router: Router) { }

get_user(){
  let user =localStorage.getItem('user')
  return JSON.parse(user);
}

actualizar(){
  let user:User = this.get_user();
  this.subscripcion = this.ciclo.subscribe(n=>{    
    this.getPosts(user.correo);
  })
}

ngOnInit(){
 let user =  this.get_user();
 console.log('correo: ',user.correo); 
 this.service.refeshEstados(user.correo);
 this.getPosts(user.correo);
}

createPost(){
  console.log('ir a posts')
  this.router.navigateByUrl('posts')
}

getPosts(correo:String){
  this.service.estados(correo).then(data=>{
    this.estados = data;
    this.estados.forEach(e => {
      this.getName(e.correo);
    });
  })
}


async getName(correo:String){
try {
  await this.service.name(correo).then(data =>{
    this.username = data
  })
} catch (error) {
  console.log(error)
}
}

async like(Oldid:String ,Oldcorreo:String, Oldimagen:String, Oldtexto:String, Oldlike:number){
  let datos:any ={
    id: Oldid,
    correo: Oldcorreo,
    imagen: Oldimagen,
    texto: Oldtexto,
    like: Oldlike+1
  }
  try {
    console.log('estado: ',datos) 
    await this.service.like(datos);
    console.log('LIKE SEND') 
  } catch (error) {
    console.log(error)
  }

}

logout(){
  this.subscripcion.unsubscribe();
  this.service.logout();
  this.estados=[];
  this.username="";
  console.log(this.get_user());
  this.router.navigateByUrl('login');
  
}


misEstados(){
  this.router.navigateByUrl('my-posts');
}

ionViewWillLeave(){
  this.subscripcion.unsubscribe();
}

ionViewWillEnter(){
  let user =  this.get_user();
 console.log('correo: ',user.correo); 
 this.service.refeshEstados(user.correo);
 this.getPosts(user.correo);
this.actualizar();
}

}
