import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class UrlShortenerService {
  BASE_URL = 'https://www.googleapis.com/urlshortener/v1';

  constructor(
    private http: Http,
  ) { }

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

  shorten(longUrl: string): Observable<string> {
    const body = { longUrl };
    const apiKey = environment.urlShortener.apiKey;
    return this.http.post(`${this.BASE_URL}/url?key=${apiKey}`, body)
      .map((response: Response) => response.json()['id']);
  }
}
