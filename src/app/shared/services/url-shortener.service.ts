import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class UrlShortenerService {
  BASE_URL = 'https://www.googleapis.com/urlshortener/v1';

  constructor(
    private http: Http,
  ) { }

  shorten(longUrl: string) {
    const body = { longUrl };
    const apiKey = environment.urlShortener.apiKey;
    this.http.post(`${this.BASE_URL}/url?key=${apiKey}`, body)
      .map((response: Response) => response.json()['id']);
  }
}
