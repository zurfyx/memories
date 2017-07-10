import { Injectable } from '@angular/core';

import { Story } from '../models';

@Injectable()
export class KmlService {

  constructor() { }

  /**
   * Generates a KML with the journey placemarks.
   */
  journey(stories: Story[]): string {
    const geolocalized: Story[] = stories.filter(story => story.isGeolocalized());
    const content = geolocalized.map(story => (
      `<Placemark>
        <name>${story.title}</name>
        <Point>
          <coordinates>${story.map.long},${story.map.lat},0</coordinates>
        </Point>
      </Placemark>`
    ));
    return this.wrapper(content.join('\n'));
  }

  /**
   * Generates a KML with the journey placemarks and the active story bubble.
   */
  story(): string {
    // TODO.
    const randomNumber = ~~(Math.random() * 10); // tslint:disable-line:no-bitwise
    const demoKml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Placemark>
      <name>Demo ${randomNumber}</name>
      <description>
        <![CDATA[
          <html>
          <head>
            <style>html, body { margin: 0; padding: 0; }</style>
          <body>
            <h1>Demo</h1>
          </body>
        </html>
        ]]>
      </description>
      <gx:balloonVisibility>0</gx:balloonVisibility>
      <Point>
        <coordinates>102,14</coordinates>
      </Point>
    </Placemark>
  </Document>
</kml>`;
    return demoKml;
  }

  private wrapper(content: string) {
    const output = `<?xml version="1.0" encoding="UTF-8"?>
            <kml xmlns="http://www.opengis.net/kml/2.2">
              <Document>${content}</Document>
            </kml>`;
    return this.minimize(output);
  }

  private minimize(output: string): string {
    return output;
  }
}
