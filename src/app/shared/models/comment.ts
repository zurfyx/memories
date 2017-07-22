import { Base } from './base';

export class Comment extends Base {
  story: string;
  owner: string;
  updatedAt: Object | number;
  description: string;
}
