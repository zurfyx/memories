import { Injectable } from '@angular/core';
import shortid from 'shortid';

@Injectable()
export class IdService {

  short(): string {
    return shortid.generate();
  }
}
