import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdProgressSpinnerModule

  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdProgressSpinnerModule
  ]
})
export class MaterialManifestModule { }
