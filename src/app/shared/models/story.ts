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
    url: string;
    title: string;
  };
}
