import {
  Component,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';

import { AuthService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.syncWithFirebase();
  }
}
