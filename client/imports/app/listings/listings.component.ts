import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { Accounts } from 'meteor/accounts-base';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { CourseService } from '../course/course.service';
import { SidenavService } from '../services/sidenav.service';
import { ListingsCollection } from '../../../../both/collections/listings.collection';
import { Listing } from "../../../../both/models/listing.model";

import template from './listings.component.html';
@Component({
  selector: 'app-listings',
  template,
  styleUrls: ['./listings.component.css']
})
@InjectUser('user')
export class ListingsComponent implements OnInit, OnDestroy {
  data: Observable<Listing[]>;
  listingsSub: Subscription;
  constructor(private courseService : CourseService,
              private sidenavService: SidenavService) { }

  ngOnInit() {
    //this.data = this.courseService.getData().zone();
    //this.listingsSub = MeteorObservable.subscribe('listings').subscribe();
    if (this.listingsSub) {
      this.listingsSub.unsubscribe();
    }
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
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        alert( `Verification sent to ${ email }!`);
        return;
      }
    });
  }

  ngOnDestroy() {
    this.listingsSub.unsubscribe();
  }

}
