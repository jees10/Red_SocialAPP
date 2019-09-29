import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
  name: 'filto'
})
export class FiltoPipe implements PipeTransform {

  transform(usuarios : User[], texto:string): User[] {
    if(texto.length === 0){
      return usuarios;
    }

    return usuarios.filter( usuario =>{
      return usuario.correo.includes(texto)
      || usuario.nombre.toLowerCase().includes(texto);
    });
  }

}
