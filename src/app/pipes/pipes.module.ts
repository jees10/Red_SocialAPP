import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltoPipe } from './filto.pipe';



@NgModule({
  declarations: [FiltoPipe],
  exports: [ FiltoPipe
  ],
  imports: [CommonModule]
})
export class PipesModule { }
   