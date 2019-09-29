import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  postform: FormGroup;
  myphoto:any;
  

  error_messages = {
    'texto':[
      {type: 'required', message:'este campo es requerido'}
    ]
  }

  constructor(
    public fb: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private service: HomeService) { }

  ngOnInit() {
    this.postform = this.fb.group({
      'texto': new FormControl('',Validators.required)
    })
  }

  atras(){
    this.router.navigateByUrl('tabs/tab1')
  }

  imagen(){
   const options: CameraOptions = {
     quality:70,
     destinationType: Camera.DestinationType.DATA_URL,
     targetWidth: 1000,
      targetHeight: 1000,
     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
     saveToPhotoAlbum:false
   } 
   Camera.getPicture(options).then((imageData)=>{
    this.myphoto = 'data:image/jpeg;base64,' + imageData;
   },(err)=>{
     console.log(err);
   })
  }

  tomarfoto(){
    let options: CameraOptions = {
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }

    Camera.getPicture( options )
    .then(imageData =>{
      this.myphoto = `data:image/jpeg;base64,${imageData}`;
    }).catch(error=>{
      console.log(error);
    });
  }

  getUser():any{
    try {
      const user = localStorage.getItem('user');
      return JSON.parse(user);
    } catch {
      return null;
    }

  }


  async save(){
    const user = this.getUser();
    let post:any = {
      correo: user.correo,
      imagen: this.myphoto,
      texto: this.postform.value.texto
    }
    try {
    await this.service.create_estado(post);
    const toast = await this.toast.create({
      message:'post creado',
      duration:4000
    });
    toast.present();
    } catch (error) {
      console.log(error)
    }
  }

}
