import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SettingsSaverService } from '../settings-saver.service';
import { Router } from '@angular/router'
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  
  SourceType="internalStorage";
  FileType="PNG";
  flag = 0;
  
  constructor(public alertController: AlertController, public saver: SettingsSaverService, public router: Router) { }

  ngOnInit() {
  }

  async stateAlert()
  {
    let alert = await this.alertController.create({
      header: "Settings did not changed",
      subHeader: "There was nothing to save",
      message: "Next time watch where you clicking",
      buttons: ["OK"]
    });
    await alert.present();
    setTimeout(() =>{
      this.router.navigate(['/home']);
    }, 1000);
  }
  async stateAlert2()
  {
    let alert = await this.alertController.create({
      header: "Settings did not changed",
      subHeader: "Settings remain the same",
      message: "The settings change has been undone",
      buttons: ["OK"]
    });
    await alert.present();
    setTimeout(() =>{
      this.router.navigate(['/home']);
    }, 1000);
  }
  async presentAlert()
  {
    let alert = await this.alertController.create({
      header: "Settings changed",
      subHeader: "Saved settings",
      message: "Your changes were saved",
      buttons: ["OK"]
    });
    await alert.present();
    setTimeout(() =>{
      this.router.navigate(['/home']);
    }, 1000);
    
  }
  filetypeChooserChange(event)
  {
    this.flag = 1;
    this.FileType = event.detail.value;
  }

  sourcetypeChooserChange(event)
  {
    this.flag = 1;
    this.SourceType = event.detail.value;
  }
  saveSettings()
  {
    if(this.flag === 1)
    {

      if(this.FileType === "" || this.SourceType === "")
      {
        this.stateAlert2();
      }
      else
      {
        this.saver.SetFileType(this.FileType);
        this.saver.SetSourceType(this.SourceType);
        this.presentAlert();
      }
      
    }
    else if(this.flag === 0)
    {
      this.stateAlert();
    }
  }
}
