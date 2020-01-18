import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataPasserService } from '../data-passer.service';
import { SettingsSaverService } from '../settings-saver.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.page.html',
  styleUrls: ['./resize.page.scss'],
})


export class ResizePage implements OnInit {

  @ViewChild('img', {static: false}) img: ElementRef;
  @ViewChild('width', {static: false}) imgwidth: ElementRef;
  @ViewChild('height', {static: false}) imgheight: ElementRef;

  sourceType= "";
  fileType = "";
  file: File;
  imageurl: string;
  width: number;
  height: number;
  margin: number;

  constructor(private resizer: Ng2ImgMaxService,public alertController: AlertController,
    public passer: DataPasserService, public settings: SettingsSaverService) { }

  readDataAsUrl()
  {
    const Reader = new FileReader();
    Reader.readAsDataURL(this.file);
    Reader.onload = e => this.imageurl = Reader.result as string;
  }
  ngOnInit() {
    this.fetchSettings();
    this.file = this.passer.GetFile();
    this.compressImage();
  }
  ionViewDidEnter()
  {
    this.fetchSettings();
    this.readDataAsUrl();
  }
  fetchImageSize(img)
  {
    this.height = img.clientHeight;
    this.width = img.clientWidth;
    this.imgheight.nativeElement.value = this.height;
    this.imgwidth.nativeElement.value = this.width;
    this.margin = (-1 * this.width/2);
    console.log(this.margin);
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
    this.margin = (-1 * this.width/2);
  }
  async setValues()
  {
    this.width = this.imgwidth.nativeElement.value;
    this.height = this.imgheight.nativeElement.value;
    this.resizer.resizeImage(this.file, this.width, this.height, true).subscribe(
      result => {
        this.file = new File([result], this.file.name, {type: "image/"+this.fileType+""});
      this.readDataAsUrl();
      this.gotPicture();
    }, (err) => {
      this.pictureAlert();
    });
  }
  compressImage()
  {
    this.resizer.compressImage(this.file, 0.100).subscribe(
      result => {
        this.file = new File([result], this.file.name, {type: "image/"+this.fileType+""});
      },
      (error) => {
        this.pictureAlert();
      }
    )
  }
  async pictureAlert()
  {
    let alert = await this.alertController.create({
      header: "File Error",
      subHeader: "Something went wrong",
      message: "Try again or change image",
      buttons: ["OK"]
    });
    await alert.present();
  }
  async gotPicture()
  {
    let alert = await this.alertController.create({
      header: "Success",
      subHeader: "Picture got resized",
      message: "You can try to resize again or save your image",
      buttons:["OK"]
    });
    await alert.present();
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
