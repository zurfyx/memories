export abstract class Base {
  $key: string;

  constructor(values) {
    Object.assign(this, values);

    if (values.$key) {
      this.$key = values.$key;
    }
  }
}
