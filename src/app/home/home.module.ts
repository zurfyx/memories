import { NgModule } from '@angular/core';
import { MdCardModule } from '@angular/material';

import { SharedModule } from '../shared';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    MdCardModule,
    SharedModule,
    HomeRoutingModule,
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule { }
