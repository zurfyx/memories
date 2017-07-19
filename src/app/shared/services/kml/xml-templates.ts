export default {
  document: (content) => `
    <?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2"
          xmlns:gx="http://www.google.com/kml/ext/2.2">
      <Document>${content}</Document>
    </kml>`,
  placemark: (placemark: Placemark) => `
    <Placemark id="${placemark.id}">
      <name>${placemark.title}</name>
      <Point>
        <coordinates>${placemark.long},${placemark.lat},0</coordinates>
      </Point>
      <description>
        <![CDATA[${placemark.html}]]>
      </description>
    </Placemark>
  `,
  tour: {
    document: (content, tourName = 'main') => `
      <gx:Tour>
        <name>${tourName}</name>
        <gx:Playlist>
          ${content}
        </gx:Playlist>
      </gx:Tour>
    `,
    toggleBallon: (placemarkId: number, visible: boolean) => `
      <gx:AnimatedUpdate>
        <gx:duration>0.1</gx:duration>
        <Update>
          <targetHref/>
          <Change>
            <Placemark targetId="${placemarkId}">
              <gx:balloonVisibility>${visible ? '1' : '0' }</gx:balloonVisibility>
            </Placemark>
          </Change>
        </Update>
      </gx:AnimatedUpdate>
    `,
    flyTo: ({ lat, long, heading }: { lat: number, long: number, heading: number }) => `
      <gx:FlyTo>
        <gx:duration>1.0</gx:duration>
        <gx:flyToMode>smooth</gx:flyToMode>
        <LookAt>
          <longitude>${long}</longitude>
          <latitude>${lat}</latitude>
          <altitude>1000</altitude>
          <heading>${heading}</heading>
          <tilt>77</tilt>
          <range>5000</range>
          <gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
        </LookAt>
      </gx:FlyTo>
    `,
  }
}

interface Placemark {
  id: number;
  title: string;
  lat: number;
  long: number;
  html: string;
};
