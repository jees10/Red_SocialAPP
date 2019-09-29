import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerform: FormGroup

  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  error_messages = {
    'correo': [
      { type: 'required', message: 'este campo es requerido'},
      { type: 'pattern', message: 'porfavor ingresa un correo valido'}
    ],
    'clave': [
      { type:'required', message: 'esta campo es requerido'},
      { type:'minLength', message: 'contraseña debe tener 8 caracteres'},
      { type: 'pattern', message: 'contraseña debe tener un numero, mayuscula y minuscula'}
    ],
    'nombre':[
      { type: 'required', message: 'este campo es requerido'}
    ]
  }

  constructor(public fb:FormBuilder,
    private service: AuthService,
    private toast:ToastController,
    private router: Router) { }

  ngOnInit() {
    this.registerform = this.fb.group({
      'correo': new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ])),
      'clave': new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      'nombre': new FormControl('',Validators.required)
    })
  }

  async save(){
    try {
      await this.service.create_user(this.registerform.value);
      const toast = await this.toast.create({
        message: '!usuario creado!',
        duration: 4000
      });
      toast.present();
      this.router.navigateByUrl('login')
    } catch (error) {
      console.log(error)
    }
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
  } 

}
