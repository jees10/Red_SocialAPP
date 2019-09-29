import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { ToastController } from '@ionic/angular';
import { MensajeService } from '../mensaje.service';
import { NotificationService } from 'src/app/notification.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  mensajes:Observable<Mensaje[]>;
  chatform:FormGroup;
  ciclo=timer(1000,1000).pipe(take(5000));
  subscripcion:Subscription;

  constructor(private service:MensajeService,
              public fb:FormBuilder,
              private toast:ToastController,
              private notification:NotificationService,
              private router:Router) { }

  ngOnInit() {
    this.chatform = this.fb.group({
      'mensaje':new FormControl('',Validators.required)
    })   
  }

  getChatMessages(canal:string){
    this.service.Mensajes(null,canal).subscribe(data =>{
      this.mensajes = data;
    }, err =>{
      console.log(err);
    })
  }

  getItem(){
      try {
        let pre = localStorage.getItem('pre');
        return JSON.parse(pre);
      } catch {
        return null;
      }
  }

  getUser(){
    let user = localStorage.getItem('user');
    return JSON.parse(user);  
}

  send(){
    let pre= this.getItem();
    let user = this.getUser();
    let mensaje:any ={
      remitente:user.correo,
      mensaje:this.chatform.value.mensaje,
      recibidor:pre.recibidor,
      canal:pre.canal
    }
    console.log('mensaje: ',mensaje);
    try {
      this.service.sendMessage(mensaje);
      this.chatform.reset();
    } catch (error) {
      console.log(error)
    }
  }


  atras(){
    this.mensajes=null;
    this.router.navigateByUrl('tabs/tab3');
  }

  actualizar(){
    let pre = this.getItem();
    if(pre.canal != ""){
      this.subscripcion = this.ciclo.subscribe(n=>{
        this.getChatMessages(pre.canal);
      })
    }
  }

  ionViewWillLeave(){
    this.subscripcion.unsubscribe();
    localStorage.setItem('pre',null);
  }
  
  ionViewWillEnter(){
  this.actualizar();
  }


  }

  


