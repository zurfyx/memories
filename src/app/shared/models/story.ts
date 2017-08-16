import { Base } from './base';

export class Story extends Base {
  journey: string;
  owner: string;
  dateStart: number;
  updatedAt: Object | number;
  title: string;
  description: string;
  map: {
    lat: number;
    long: number;
  };
  coverURL: string;
  photos: {
    [uid: string]: {
      url: string;
      title?: string;
    },
  };
  videos: {
    [uid: string]: {
      id: string,
      type: string,
    }
  };

  isGeolocalized(): boolean {
    return !!this.map
        && !!this.map.lat
        && !!this.map.long;
  }
}
