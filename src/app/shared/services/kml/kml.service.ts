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

  /**
   * Generates a KML with the journey placemarks.
   */
  placemarks(
    stories: Story[],
    user: User,
    { highlight, headers = true }: { highlight?: Story; headers?: boolean } = {},
  ): string {
    const content = stories.map((story) => {
      const isHighlighted = !!highlight && story.$key === highlight.$key
      return this.placemark(story, user, isHighlighted);
    }).join('\n');
    return this.wrap(content, headers);
  }

  /**
   * Generates a KML with the journey placemarks and the active story bubble.
   */
  placemark(
    story: Story,
    user: User,
    { highlight = false, headers = true, placemarkId = 0 }
      : { highlight?: boolean; headers?: boolean, placemarkId?: number } = {}
  ): string {
    if (!story.isGeolocalized()) {
      return '';
    }
    const content = xml.placemark({
      id: placemarkId,
      title: story.title,
      lat: story.map.lat,
      long: story.map.long,
      html: html.bubble({
        imageUrl: story.coverURL,
        dateText: this.datePipe.transform(story.dateStart),
        ownerDisplayName: user.displayName,
        description: story.description,
      }),
    });
    // const content = `<Placemark id="${placemarkId}">
    //   <name>${story.title}</name>
    //   <Point>
    //     <coordinates>${story.map.long},${story.map.lat},0</coordinates>
    //   </Point>
    //   <description>
    //     <![CDATA[
    //       ${html.bubble({
    //         imageUrl: story.coverURL,
    //         dateText: this.datePipe.transform(story.dateStart),
    //         ownerDisplayName: user.displayName,
    //         description: story.description,
    //       })}
    //     ]]>
    //   </description>
    //   <gx:balloonVisibility>${highlight ? 1 : 0}</gx:balloonVisibility>
    // </Placemark>`;
    return this.wrap(content, headers);
  }

  placemarkTour(
    story: Story,
    user: User,
    { headers = true, placemarkId = 0 }: { headers?: boolean, placemarkId?: number } = {}
  ): string {
    if (!story.isGeolocalized()) {
      return '';
    }
    const placemarks = this.placemark(story, user, { headers: false });
    const showBubble = this.placemarkTourShowBubble(placemarkId);
    const fly360 = this.placemarkTour360(story);
    const tour = xml.tour.document(`${showBubble}${fly360}`);
    const content = `${placemarks}${tour}`;
    return this.wrap(content, headers);
  }

  private placemarkTourShowBubble(targetId: number): string {
    return xml.tour.toggleBallon(targetId, true);
  }

  private placemarkTour360(story: Story): string {
    const degress = Array.from(Array(36), (_, i) => i * 10); // 360º
    return degress.map((heading) => (
      xml.tour.flyTo({
        heading,
        lat: story.map.lat,
        long: story.map.long,
      })
    )).join('\n');
  }

  wrap(content: string, includeHeaders = true): string {
    const withHeaders = xml.document(content);
    const minified = this.minify(includeHeaders ? withHeaders : content);
    return this.minify(minified);
  }

  private minify(kmlText: string): string {
    const minified = kmlText.trim().replace(/>\s+</g, '><');
    return minified;
  }
}

