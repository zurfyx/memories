import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import ellipsis from 'text-ellipsis';
import { Observable } from 'rxjs/Rx';

import { Story, User } from '../models';
import { UserService } from './user.service';

@Injectable()
export class KmlService {

  constructor(
    private datePipe: DatePipe,
    private userService: UserService,
  ) { }

  /**
   * Generates a KML with the journey placemarks.
   */
  placemarks(stories: Story[], user: User, highlight?: Story): string {
    const content = stories.map(story => this.placemark(story, user, story.$key === highlight.$key));
    return this.wrapper(content.join('\n'));
  }

  /**
   * Generates a KML with the journey placemarks and the active story bubble.
   */
  private placemark(story: Story, user: User, showBubble = false): string {
    if (!story.isGeolocalized()) {
      return '';
    }
    return `<Placemark>
      <name>${story.title}</name>
      <Point>
        <coordinates>${story.map.long},${story.map.lat},0</coordinates>
      </Point>
      <description>
        <![CDATA[
          ${KML_TEMPLATES.bubble({
            imageUrl: story.coverURL,
            dateText: this.datePipe.transform(story.dateStart),
            ownerDisplayName: user.displayName,
            description: story.description,
          })}
        ]]>
      </description>
      <gx:balloonVisibility>${showBubble ? 1 : 0}</gx:balloonVisibility>
    </Placemark>`;
  }

  private wrapper(content: string) {
    const output = `<?xml version="1.0" encoding="UTF-8"?>
            <kml xmlns="http://www.opengis.net/kml/2.2"
                 xmlns:gx="http://www.google.com/kml/ext/2.2">
              <Document>${content}</Document>
            </kml>`;
    return this.minify(output);
  }

  private minify(kmlText: string): string {
    const minified = kmlText.trim().replace(/>\s+</g, '><');
    return minified;
  }
}

const KML_TEMPLATES = {
  bubble: ({imageUrl, dateText, ownerDisplayName, description}) => `
    ${imageUrl ? `<img class="banner" src="${imageUrl}" />` : ''}
    <div class="separator"></div>
    <div class="row tcenter">
      <span class="col2 date">${dateText}</span>
      <span class="col2 author">${ownerDisplayName}</span>
    </div>
    <div class="separator"></div>
    <pre class="description">${ellipsis(description, 450)}</pre>
    <div class="logo tcenter">
      <i class="fa fa-globe" aria-hidden="true"></i>
    </div>
    <div class="copyright tcenter">Geographical Memories @ 2017</div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 600px;
      font-family: 'Helvetica', Arial, sans-serif;
    }

    .separator {
      margin-top: 15px;
      border-top: 1px solid #ddd;
      margin-bottom: 15px;
    }

    .row:after {
      display: block;
      content: '';
      clear: both;
    }

    .col2 {
      width: 50%;
      float: left;
    }

    .tcenter {
      text-align: center;
    }

    .inline > * {
      flex: 1;
    }

    .banner {
      width: 100%;
      max-height: 420px;
    }

    .date {
      display: block;
    }

    pre.description {
      font-family: inherit;
      text-align: justify;
      text-justify: inter-word;
      white-space: pre-wrap;
    }

    .logo {
      color: #4386fc;
    }

    .copyright {
      margin-top: 10px;
      font-size: 0.8em;
    }
    </style>
  `,
};
