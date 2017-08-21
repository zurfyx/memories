import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

  /**
   * Current clean path: without query strings nor fragment.
   * If the port is 80, it will be omitted.
   */
  currentUrl() {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    const pathName = window.location.pathname;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}${pathName}`;
  }
}
