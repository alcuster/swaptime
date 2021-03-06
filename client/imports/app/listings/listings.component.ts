import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { Accounts } from 'meteor/accounts-base';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MdDialog, MdDialogRef } from '@angular/material';
import {Router} from '@angular/router';

import { ListingService } from '../listings/listing.service';
import { SidenavService } from '../services/sidenav.service';
import { ListingsCollection } from '../../../../both/collections/listings.collection';
import { Listing } from "../../../../both/models/listing.model";
import { LoginDialog } from '../auth/logindialog.component';
import { SignupDialog } from '../auth/signupdialog.component';

import template from './listings.component.html';
import style from './listings.component.scss';

@Component({
  selector: 'app-listings',
  template,
  styles: [style]
})
@InjectUser('user')
export class ListingsComponent implements OnInit, OnDestroy {
  data: Observable<Listing[]>;
  listingsSub: Subscription;
  usersSub: Subscription;

  constructor(private router: Router,
              private listingService : ListingService,
              private sidenavService: SidenavService,
              public dialog: MdDialog) { }

  ngOnInit() {
    if (this.listingsSub) {
      this.listingsSub.unsubscribe();
    }

    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }

    this.usersSub = MeteorObservable.subscribe('users').subscribe(() => {});

    this.listingsSub = MeteorObservable.subscribe('listings').subscribe(() => {
      this.data = ListingsCollection.find({}, {
        sort: {
          createdAt: -1
        }
      }).zone();
    });

  }

  logout() {
    Meteor.logout();
  }

  toggle() {
    this.sidenavService.requestToggle();
  }

  resendVerification() {
    Meteor.call( 'sendVerificationLink', ( error, response ) => {
      if ( error ) {
        alert(error);
        return;
      }
      else {
        let email = Meteor.user().emails[ 0 ].address;
        alert(`Verification sent to ${ email }!`);
        return;
      }
    });
  }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'loginSuccess') {
        window.location.reload();
      }
      if (result == 'signup') {
        this.openSignupDialog();
      }
    });
  }

  openSignupDialog() {
    let dialogRef = this.dialog.open(SignupDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'signupSuccess') {
        window.location.reload();
      }
      if (result == 'login') {
        this.openLoginDialog();
      }
    });
  }

  ngOnDestroy() {
    this.listingsSub.unsubscribe();
  }

}
