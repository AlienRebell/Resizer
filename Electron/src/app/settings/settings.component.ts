import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsPasserService } from '../settings-passer.service';
import { FormGroup, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  SourceType="internalStorage";
  FileType="PNG";
  message: string;

  constructor(private dialog: MatDialog,public saver: SettingsPasserService, public router: Router) { }

  settings = new FormGroup({
    filetype: new FormControl("PNG"),
    fileSource: new FormControl("internalStorage")
  });

  ngOnInit() {
  }
  openDialog(message: string)
  {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: message
    });
  }

  saveSettings()
  {
    this.FileType = this.settings.get("filetype").value;
    this.SourceType = this.settings.get("fileSource").value;

    if(this.FileType === "PNG" && this.SourceType === "internalStorage")
    {
      this.message = "Settings did not changed!"
      this.openDialog(this.message);
    }
    else
    {
      this.saver.SetFileType(this.FileType);
      this.saver.SetSourceType(this.SourceType);
      this.message = "Settings are saved!"
      this.openDialog(this.message);
    }

    setTimeout(() =>{
      this.router.navigate(["/screen"]);
    }, 1000)
  }

}
