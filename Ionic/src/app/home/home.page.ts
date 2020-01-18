import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { SettingsSaverService } from '../settings-saver.service';
import { HttpClient } from '@angular/common/http';
import { DataPasserService } from '../data-passer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  webAddress: string = "";
  image: File;
  extensions: Array<string> = ["jpg", "png", "gif", "bmp", "JPG", "PNG", "GIF", "BMP"]
  sourceType= "";
  fileType = "";
  constructor(private http: HttpClient, private saver: SettingsSaverService, private router: Router,
    public alertController: AlertController, public passer: DataPasserService) { }

  ngOnInit() {
    this.fetchSettings();
  }
  ngDoCheck()
  {
    this.fetchSettings();
  }

  async stateAlert()
  {
    let alert = await this.alertController.create({
      header: "File Error",
      subHeader: "Something went wrong",
      message: "The given file has no valid image extension",
      buttons: ["OK"]
    });
    await alert.present();
  }
  async stateAlert2()
  {
    let alert = await this.alertController.create({
      header: "Received image!",
      subHeader: "Given correct file from device",
      message: "File is ready to edit and to convert to extension specified, click Proceed to proceed",
      buttons:["OK"]
    });
    await alert.present();
  }
  async stateAlert3()
  {
    let alert = await this.alertController.create({
      header: "File Error",
      subHeader: "Something went wrong",
      message: "The given link or downloaded file is not image",
      buttons: ["OK"]
    });
    await alert.present();
  }

  WorkOffData()
  {
    if(this.sourceType === 'internalStorage')
    {
      if(this.image === null)
      {
        this.stateAlert3();
      }
      else
      {
        this.passer.SetFile(this.image);
        setTimeout(() =>{
          this.router.navigate(["/resize"]);
        });
      }
    }
    else if(this.sourceType === 'web')
    {
      this.getFileFromWeb();

    }
    
  }
  upload($event)
  {
    var image = $event.target.files[0];
    var name = image.name;
    var flag = 0;
    var extension = name.substring(name.lastIndexOf(".")+1);
    this.extensions.forEach( ext => {
      if(ext === extension)
      {
        flag = 1;
      }
    });
    if(flag === 1)
    {
      this.stateAlert2();
      var name = image.name.split(".").slice(0, -1).join('.');
      name = name+ "." + this.fileType;
      this.image = new File([image], name, {type: 'image/'+this.fileType+'',lastModified: Date.now()});
    }
    else
    {
      this.stateAlert();
    }
  }

  fetchSettings()
  {
    this.sourceType = this.saver.GetSourceType();
    this.fileType =this.saver.GetFileType();
  }

  getFileFromWeb()
  {
    let newfile: File;
    var linkname = this.webAddress;
    var flag = 0;
    var extension = linkname.substring(linkname.lastIndexOf(".")+1);
    this.extensions.forEach( ext => {
      if(ext === extension)
      {
        flag = 1;
      }
    });
    if(flag === 1)
    {
        let name = "temporary."+this.fileType;
        this.http.get(this.webAddress, { responseType: 'blob'}).subscribe(result =>{
        newfile = new File([result], name, {type: 'image/'+this.fileType+'',lastModified: Date.now()});
        if(newfile == null)
        {
          this.stateAlert3();
        }
        else
        {
          this.passer.SetFile(newfile);
          setTimeout(() =>{
            this.router.navigate(["/resize"]);
          }, 2000);
        }
      }, () => {
        this.passer.setlink(this.webAddress);
      });
    }
  }
}
