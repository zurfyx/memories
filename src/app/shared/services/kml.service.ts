import { Injectable } from '@angular/core';

@Injectable()
export class KmlService {

  constructor() { }

  /**
   * Generates a KML with the journey placemarks.
   */
  journey() {
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
}
