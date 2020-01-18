import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsPasserService {

  private fileType: string = "PNG";
  private sourceType:string = "internalStorage";
  constructor() { }

  GetFileType()
  {
    return this.fileType;
  }
  SetFileType(filetypecontainer: string)
  {
    this.fileType = filetypecontainer;
  }
  GetSourceType()
  {
    return this.sourceType;
  }
  SetSourceType(sourcetypecontainer: string)
  {
    this.sourceType = sourcetypecontainer;
  }
}
