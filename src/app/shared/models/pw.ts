import { Base } from './base';

export class Pw extends Base {
  url: string;
  shortUrl: string;
  title: string;
  description: string;
  createdAt: number;
  beacon: {
    id: string,
    name: string,
  };
}
