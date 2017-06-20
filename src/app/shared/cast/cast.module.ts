import { NgModule } from '@angular/core';

import { CastService } from './cast.service';
import { CastComponent } from './cast.component';

@NgModule({
  imports: [],
  exports: [CastComponent],
  declarations: [CastComponent],
  providers: [CastService],
})
export class CastModule { }
