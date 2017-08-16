import { FormControl } from '@angular/forms';

export class Validators {
  static isVideo(input: FormControl) {
    // https://stackoverflow.com/a/27728417
    const REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    return input.value.match(REGEX) ? null : { isVideo: false };
  }
}
