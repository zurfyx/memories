import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ResponsiveModule } from 'ng2-responsive';

import {
  ShowOnSignedInDirective,
} from './directives';
import {
  SafeHtmlPipe,
  SafeResourceUrlPipe,
  SafeStylePipe,
  SafeUrlPipe,
} from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ResponsiveModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ResponsiveModule,
    ShowOnSignedInDirective,
    SafeHtmlPipe,
    SafeResourceUrlPipe,
    SafeStylePipe,
    SafeUrlPipe,
  ],
  declarations: [
    ShowOnSignedInDirective,
    SafeHtmlPipe,
    SafeResourceUrlPipe,
    SafeStylePipe,
    SafeUrlPipe,
  ],
})
export class SharedModule { }
