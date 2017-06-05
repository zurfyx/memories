import { Observable, BehaviorSubject } from 'rxjs/Rx';

export class FormUtils {
  static getFilesFromEvent(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    const files: FileList = target.files;
    return files;
  }

  static base64FromImageFile(image: File): Observable<string> {
    const result = new BehaviorSubject(undefined);
    const reader = new FileReader();

    reader.onload = e => result.next(reader.result);
    reader.readAsDataURL(image);

    return result;
  }
}
