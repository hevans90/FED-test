import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdInputModule,
  MdCheckboxModule,
  MdProgressSpinnerModule,
  MdCardModule, MdTableModule,
  MdPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdTableModule,
    MdPaginatorModule
  ],
  exports: [
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdTableModule,
    MdPaginatorModule
  ]
})
export class MaterialManifestModule { }
