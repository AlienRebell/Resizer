import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ResizerComponent } from './resizer/resizer.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: 'screen', component: LoaderComponent },
  { path: 'resizer', component: ResizerComponent },
  { path: 'preferences', component: SettingsComponent },
  { path: '', redirectTo: 'screen', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
