import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import { Story, User } from '../../models';
import { UserService } from '../user.service';
import html from './html-templates';
import xml from './xml-templates';

@Injectable()
export class KmlService {

  constructor(
    private datePipe: DatePipe,
    private userService: UserService,
  ) { }

  empty(): string {
    return xml.document();
  }

  tour(stories: Story[], user: User): string {
    const geolocalized = this.excludeUngeolocalized(stories);
    if (geolocalized.length === 0) {
      return this.empty();
    }

    const placemarks: string = this.placemarks(geolocalized, user);
    const tourData: string = geolocalized.map((story, i) => `
      ${xml.tour.toggleBallon(story.$key, true)}
      ${this.fly360(story)}
    `).join('\n');
    const tour: string = xml.tour.document(tourData);
    const document: string = xml.document(`${placemarks}${tour}`);
    return this.minify(document);
  }

  soloTour(stories: Story[], focus: Story, user: User): string {
    const geolocalized = this.excludeUngeolocalized(stories);
    if (geolocalized.length === 0) {
      return this.empty();
    }

    const placemarks: string = this.placemarks(geolocalized, user);
    const tour: string = focus.isGeolocalized()
      ? xml.tour.document(`
          ${xml.tour.toggleBallon(focus.$key, true)}
          ${this.fly360(focus)}
        `)
      : ''; // Can't tour the focus story because it's not geolocalized.
    const document: string = xml.document(`${placemarks}${tour}`);
    return this.minify(document);
  }

  private excludeUngeolocalized(stories: Story[]): Story[] {
    return stories.filter(story => story.isGeolocalized());
  }

  private placemarks(stories: Story[], user: User): string {
    return stories.map((story, i) => xml.placemark({
      id: story.$key,
      title: story.title,
      lat: story.map.lat,
      long: story.map.long,
      html: html.bubble({
        imageUrl: story.coverURL,
        dateText: this.datePipe.transform(story.dateStart),
        ownerDisplayName: user.displayName,
        description: story.description,
      }),
    })).join('\n');
  }

  private fly360(story: Story): string {
    const headings = Array.from(Array(36), (_, i) => i * 10); // 360º in stacks of 10
    return headings.map(heading => (
      xml.tour.flyTo({
        heading,
        lat: story.map.lat,
        long: story.map.long,
      })
    )).join('\n');
  }

  private minify(kmlText: string): string {
    return kmlText.trim().replace(/>\s+</g, '><');
  }
}
