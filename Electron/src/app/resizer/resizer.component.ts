import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DataPasserService } from '../data-passer.service';
import { SettingsPasserService } from '../settings-passer.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-resizer',
  templateUrl: './resizer.component.html',
  styleUrls: ['./resizer.component.css']
})
export class ResizerComponent implements OnInit {

  @ViewChild('img', {static: false}) img: ElementRef;
  @ViewChild('width', {static: false}) imgwidth: ElementRef;
  @ViewChild('height', {static: false}) imgheight: ElementRef;
  sourceType = "";
  fileType = "";
  file: File;
  imageurl: string;
  width: number;
  height: number;
  margin: number;
  message: string;

  constructor(private resizer: Ng2ImgMaxService,private dialog: MatDialog,
     public passer: DataPasserService, public settings: SettingsPasserService) { }
  
  ngOnInit() {
    this.fetchSettings();
    this.file = this.passer.GetFile();
    this.readDataAsUrl();
    this.compressImage();
  }
  readDataAsUrl()
  {
    const Reader = new FileReader();
    Reader.readAsDataURL(this.file);
    Reader.onload = e => this.imageurl = Reader.result as string;
  }
  openDialog(message: string)
  {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: message
    });
  }
  fetchImageSize(img)
  {
    this.height = img.clientHeight;
    this.width = img.clientWidth;
    this.imgheight.nativeElement.value = this.height;
    this.imgwidth.nativeElement.value = this.width;
    if(this.width < 1000)
    {
      this.margin = (this.width/10);
    }
    else if(this.width > 1000)
    {
      this.margin = (this.width/100);
    }
      
  }
  fetchSettings()
  {
    this.sourceType = this.settings.GetSourceType();
    this.fileType =this.settings.GetFileType();
  }
  onResize(event)
  {
    this.width = (this.img.nativeElement as HTMLImageElement).clientWidth;
    this.height = (this.img.nativeElement as HTMLImageElement).clientHeight;
    this.imgheight.nativeElement.value = this.height;
    this.imgwidth.nativeElement.value = this.width;
  }
  async setValues()
  {
    this.width = this.imgwidth.nativeElement.value;
    this.height = this.imgheight.nativeElement.value;
    this.resizer.resizeImage(this.file, this.width, this.height, true).subscribe(
      result => {
        this.file = new File([result], this.file.name, {type: "image/"+this.fileType+""});
      this.readDataAsUrl();
      this.message = "Values set"
      this.openDialog(this.message);
    }, (err) => {
      this.message = "Values could not be set"
      this.openDialog(this.message);
    });
  }
  compressImage()
  {
    this.resizer.compressImage(this.file, 0.100).subscribe(
      result => {
        this.file = new File([result], this.file.name, {type: "image/"+this.fileType+""});
      },
      (error) => {
        this.message = "Image could not be compressed!"
      this.openDialog(this.message);
      }
    )
  }
  saveAs()
  {
    var a = document.createElement("a");
    var file = this.file;
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    a.click();
  }

}
