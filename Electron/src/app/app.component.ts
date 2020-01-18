import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router){}
  title = 'electron-app';
  @ViewChild("menu", {static: false}) menu: ElementRef;
  @ViewChild('Sidebar', {static: false}) Sidebar: ElementRef;
  @ViewChild("container", {static: false}) container: ElementRef;
  closeSidebar()
  {
    this.menu.nativeElement.classList.add("togglebutton2");
    this.menu.nativeElement.classList.remove("togglebutton");
    this.Sidebar.nativeElement.classList.remove('toggled');
    this.Sidebar.nativeElement.classList.add('toggled2');
    this.container.nativeElement.classList.remove('keeper2');
    this.container.nativeElement.classList.add('keeper');
  }
  openSidebar()
  {
    this.menu.nativeElement.classList.add("togglebutton");
    this.menu.nativeElement.classList.remove("togglebutton2");
    this.Sidebar.nativeElement.classList.add('toggled');
    this.Sidebar.nativeElement.classList.remove('toggled2');
    this.container.nativeElement.classList.add('keeper2');
    this.container.nativeElement.classList.remove('keeper');
  }

  settings()
  {
    setTimeout(() => {
      this.router.navigate(["/preferences"]);
    }, 1000);
  }
  toMainScreen()
  {
    setTimeout(() => {
      this.router.navigate(["/screen"]);
    }, 1000)
  }
}

