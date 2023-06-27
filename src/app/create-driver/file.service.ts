import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private file: File
  constructor() { }

  setFile(file: File):void {
    this.file = file;
  }

  getFile(): File {
    return this.file;
  }
}
