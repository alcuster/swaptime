import { Component } from '@angular/core';
import template from './about.component.html';
import style from './about.component.scss';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'about',
  template,
  styles: [ style ]
})

export class AboutComponent {
  constructor(private sidenavService: SidenavService) {}

  toggle() {
    this.sidenavService.requestToggle();
  }
}
