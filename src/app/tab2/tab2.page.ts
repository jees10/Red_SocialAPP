import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/User';
import { Amigos } from '../models/amigos';
import { Solicitud } from '../models/solicitud';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

usuarios: User[] =[];
correoAmigo: any ={
  correo:String
}

validador = false;

amigos: Amigos[]=[];
textoBuscar = '';

array1:any[]=[];

  constructor(private service:UserService,
              private toast:ToastController,
              private router:Router) { }


 

  buscarUsuario( event ) {
    const texto = event.target.value;
    this.textoBuscar = texto;
  }

  ngOnInit(){  
    let user = this.getUser();
    this.getAmigos(user.correo);
    this.getUsers();  
    
  }

  get(){
    this.validador = true
    let user = this.getUser();
    this.getAmigos(user.correo);    
  }

  getUser(){
    let user = localStorage.getItem('user')
    return JSON.parse(user)
  }

  async getUsers(){
    this.validador = false;
     try {
       await this.service.getUsers().then(data =>{
         this.usuarios = data;
       })
     } catch (error) {
       console.log(error)
     }     

     this.filtro();
   }

  getAmigos(correo:string){
    this.service.getAmigos(correo).then(data =>{
      this.amigos = data;
    })
  }

  filtro(){
    console.log("tamaño amigos: ",this.amigos.length);
    this.usuarios.forEach(u => {
      this.amigos.forEach(a => {
        if(JSON.stringify(u.correo) == JSON.stringify(a.correoAmigo)){
          this.usuarios.splice(this.usuarios.indexOf(u),2);
        }
      });
      
    });

    
    
  }

  async agregar(correo:string,nombre:string){
    let user:User = this.getUser();
    let sol:Solicitud = {
      id:"",
      correo: user.correo,
      nombreAmigo:nombre,
      correoAmigo:correo
    }    
    try {
      this.service.solicitud(sol);
      const toast = await this.toast.create({
        message:`solicitud enviada a ${nombre}`,
        duration:2000
      });
      toast.present(); 
    } catch (error) {
      console.log(error);
    }
  }

  send(correo:string){
    console.log('recibidor: ',correo);
    let pre:any = {
    canal: "",
    recibidor:correo
    }
    localStorage.setItem('pre',JSON.stringify(pre));
    this.router.navigateByUrl('chat');
  }

  eliminar(arr:User[],prop:string){
    let nuevoArray = [];
    let lookup={};
  
    for(let i in arr){
      lookup[arr[i][prop]] = arr[i];
    }
  
    for(let i in lookup){
      nuevoArray.push(lookup[i])
    }
  
    this.array1 = nuevoArray;
    
  }






}
