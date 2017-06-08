export abstract class Base {
  $key: string;

  constructor(values) {
    Object.assign(this, values);
    this.$key = values.$key;
  }
}
