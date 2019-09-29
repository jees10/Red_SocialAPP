import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from './posts.service';
import { Estado } from '../models/estado';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.page.html',
  styleUrls: ['./my-posts.page.scss'],
})
export class MyPostsPage implements OnInit {

  estados:Estado[];

  constructor(private router: Router,
              private service:PostsService) { }

  ngOnInit() {
    let user = this.getUser();
    console.log("correo",user.correo);
    this.get_estados(user.correo);
  }

  getUser():any{
    try {
      let user = localStorage.getItem('user');
       return JSON.parse(user); 
    } catch {
      return null;
    }
  }

  get_estados(correo:String){
    this.service.mis_estados(correo).then(data =>{
    this.estados = data;
  })
  }

  atras(){
    this.router.navigateByUrl('tabs/tab1');
    this.estados = null;
  }

}
