import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { CourseService } from '../course/course.service';
import { SidenavService } from '../services/sidenav.service';
import { ListingsCollection } from '../../../../both/collections/listings.collection';
import { Listing } from "../../../../both/models/listing.model";

import template from './ownlistings.component.html';
import style from './ownlistings.component.scss';

@Component({
  selector: 'own-listings',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class OwnListingsComponent implements OnInit, OnDestroy {
  data: Observable<Listing[]>;
  listingsSub: Subscription;

  constructor(private courseService : CourseService,
              private sidenavService: SidenavService,
              private router: Router) { }

  ngOnInit() {
    this.data = this.courseService.getMine(Meteor.userId()).zone();
    this.listingsSub = MeteorObservable.subscribe('listings').subscribe();
  }

  logout() {
    Meteor.logout();
    let link = ['/listings'];
    this.router.navigate(link);
  }

  toggle() {
    this.sidenavService.requestToggle();
  }

  ngOnDestroy() {
    this.listingsSub.unsubscribe();
  }

}
