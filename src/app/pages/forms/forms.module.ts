import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormsPageRoutingModule } from './forms-routing.module';

import { FormsPage } from './forms.page';
import { AppComponent } from 'src/app/app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    FormsPageRoutingModule
  ],
  declarations: [FormsPage, HelloComponent],
  bootstrap: [AppComponent]
})
export class FormsPageModule {}
