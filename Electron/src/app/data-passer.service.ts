import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPasserService {

  private link: string;
  private file: File;

  constructor() { }

  GetFile()
  {
    return this.file;
  }
  SetFile(newfile: File)
  {
    this.file = newfile;
  }
  setlink(newlink: string)
  {
    this.link = newlink;
  }
  getlink()
  {
    return this.link;
  }

}
