import { NgModule } from '@angular/core';

import { NavbarModule, NavbarComponent } from './navbar';

@NgModule({
  imports: [
    NavbarModule,
  ],
  exports: [
    NavbarComponent,
  ],
  declarations: [],
  providers: [],
})
export class SharedModule { }
