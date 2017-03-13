import { Component } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import template from './mobilenav.component.html';
import style from './mobilenav.component.scss';

@Component({
  selector: 'mobilenav',
  template,
  styles: [style]
})
@InjectUser('user')
export class MobileNavComponent {
  constructor() { }
}
