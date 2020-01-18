import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { ResizerComponent } from './resizer/resizer.component';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ResizerComponent,
    LoaderComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2ImgMaxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
