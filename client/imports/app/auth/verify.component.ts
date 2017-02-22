import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { Subscription } from 'rxjs/Subscription';

import template from './verify.component.html';

@Component({
  selector: 'verify',
  template
})
export class VerifyComponent implements OnInit, OnDestroy {
  error: string;
  paramsSub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone) {}

  ngOnInit() {
    this.error = '';
    this.paramsSub = this.route.params
      .map(params => params['token'])
      .subscribe(token => {
        let verifyToken = token;
        Accounts.verifyEmail(verifyToken, (err) => {
          this.zone.run(() => {
            if ( err ) {
              this.error = err.reason;
            } else {
              this.router.navigate(['/listings']);
            }
          });
        })
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
