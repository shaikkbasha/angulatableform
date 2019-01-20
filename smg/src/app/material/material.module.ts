import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/Material'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule
  ],
  exports : [
    Material.MatToolbarModule,

  ],
})
export class MaterialModule { }
