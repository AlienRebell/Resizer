import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsPasserService } from "../settings-passer.service";
import { DataPasserService } from "../data-passer.service";
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  webAddress: string = "";
  image: File;
  extensions: Array<string> = ["jpg", "png", "gif", "bmp", "JPG", "PNG", "GIF", "BMP"];
  sourceType = "";
  fileType = "";
  message: string;
  flag: number;

  constructor( private dialog: MatDialog,
    private http: HttpClient, private saver: SettingsPasserService, 
    public passer: DataPasserService, private router: Router) { }

  ngOnInit()
  {
    this.fetchSettings();
  }
  ngDoCheck()
  {
    this.fetchSettings();
  }

  WorkOffData()
  {
    if(this.sourceType === "internalStorage")
    {
      if(this.flag === 0)
      {
        this.message = "There is no image to work with";
        this.openDialog(this.message);
      }
      else
      {
        this.passer.SetFile(this.image);
        setTimeout(() => {
          this.router.navigate(["/resizer"]);
        }, 1500);
      }
    }
    else if(this.sourceType === "web")
    {
      this.getFileFromWeb();
      if(this.flag !== 0)
      {
         setTimeout(() => {
          this.router.navigate(["/resizer"]);
          }, 2000);
      }
     
    }
  }

  upload($event)
  {
    var image = $event.target.files[0];
    var name = image.name;
    this.flag = 0;
    var extension = name.substring(name.lastIndexOf(".")+1);
    for(var i = 0; i < this.extensions.length; i++)
    {
      if(this.extensions[i] === extension)
      {
        this.flag = 1;
        break;
      }
    }
    if(this.flag === 1)
    {
      var name = image.name.split(".").slice(0, -1).join(".");
      name = name+"."+this.fileType;
      this.image = new File([image], name, {type: 'image/'+this.fileType+'', lastModified: Date.now() });
      this.message ="Image ready to work with";
      this.openDialog(this.message);
    }
    else{
      this.message = "The extension of given file is invalid"
      this.openDialog(this.message);
    }

  }

  fetchSettings()
  {
    this.sourceType = this.saver.GetSourceType();
    this.fileType = this.saver.GetFileType();
  }

  openDialog(message: string)
  {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: message
    });
  }

  getFileFromWeb()
  {
    let newfile: File;
    var linkname = this.webAddress;
    var extension = linkname.substring(linkname.lastIndexOf(".")+1);
    for(var i = 0; i < this.extensions.length; i++)
    {
      if(this.extensions[i] === extension)
      {
        this.flag = 1;
        break;
      }
    }
    console.log(this.flag)
    if(this.flag === 1)
    {
      let name = "temporary."+this.fileType;
      this.http.get(this.webAddress, { responseType: 'blob', }).subscribe(result => {
        newfile = new File([result], name, {type: 'image/'+this.fileType+"", lastModified: Date.now()})
        if(newfile == null)
        {
          this.message = "Image could not be created";
          this.openDialog(this.message);
        }
        else
        {
          this.passer.SetFile(newfile);
          this.message ="Image is ready to work with";
          this.openDialog(this.message);
        }
      }, () => {
        this.passer.setlink(this.webAddress);
        this.message ="Image ready to work with";
        this.openDialog(this.message);
      });
    }
    else if(this.flag === 0)
    {
      this.message = "The extension of given file is invalid"
      this.openDialog(this.message);
    }
  }
}
