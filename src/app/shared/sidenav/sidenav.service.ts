import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SidenavService {
  isMobileNavbarOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
