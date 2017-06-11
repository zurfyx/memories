import { Journey } from './journey';

describe('Journey', () => {
  it('should not include $key field if not explicitely given', () => {
    const journey = new Journey({});
    const props = Object.getOwnPropertyNames(journey);
    expect(props.length).toBe(0);
  });
});
