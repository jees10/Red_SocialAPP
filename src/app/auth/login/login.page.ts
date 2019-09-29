import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})  
export class LoginPage implements OnInit {

  loginform: FormGroup
  inputType = 'password';
  visible = false;

  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  loged_user:any;

  error_messages = {
    'correo': [
      { type: 'required', message: 'este campo es requerido'},
      { type: 'pattern', message: 'porfavor ingresa un correo valido'}
    ],
    'clave': [
      { type:'required', message: 'esta campo es requerido'}
    ],
  }

  constructor(private service:AuthService,
    public fb:FormBuilder,
    public router: Router
    ) { }    

  ngOnInit() {
    this.loginform = this.fb.group({
      'correo': new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ])),
      'clave': new FormControl('',Validators.required)
    })
  }

  login(){
  this.service.login(this.loginform.value).then(validUser=>{
     validUser = this.service.getUser();
     if(validUser){
       this.router.navigate(['/']);
     }
  })  
  }
  
  
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    
}
    
}
