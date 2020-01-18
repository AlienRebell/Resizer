import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataPasserService {

  private link: string;
  private file: File;
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

  constructor() { }
}
