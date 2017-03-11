import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { SidenavService } from './services/sidenav.service';
import template from './app.component.html';
import style from './app.component.scss';
import { InjectUser } from 'angular2-meteor-accounts-ui';

@Component({
  selector: 'app-root',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class AppComponent {
  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private sidenavService: SidenavService) {
    sidenavService.toggleRequested$.subscribe(
      child => {
        this.sidenav.toggle();
      });
  }

  toggle() {
    this.sidenavService.requestToggle();
  }

}
