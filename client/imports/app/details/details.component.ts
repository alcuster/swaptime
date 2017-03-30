import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Observable } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Random } from 'meteor/random';
import { Listing } from "../../../../both/models/listing.model";
import { ListingService } from '../listings/listing.service';
import template from './details.component.html';
import style from './details.component.scss';
import * as moment from 'moment';

@Component({
  selector: 'app-details',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class DetailsComponent implements OnInit, OnDestroy {
  listing: Listing;
  sub: any;
  user: Meteor.User;
  ownerName: String;
  profilePic: String;

  constructor(private listingService: ListingService,
              private route: ActivatedRoute,
              private zone: NgZone,
              private router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.listing = this.listingService.getFromDB(id);

      let owner = Meteor.users.findOne(this.listing.owner);
      this.ownerName = owner.profile.displayname;
      this.profilePic = owner.profile.picture;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isOwner(listing: Listing): boolean {
    return this.user && this.user._id === listing.owner;
  }

  deleteListing() {
    this.listingService.deleteFromDB(this.listing, this.user);
  }

  addChat(recipient): void {
    if (!this.user) {
      alert("You must be logged in to contact another user.");
      return;
    }

    MeteorObservable.call('addChat', recipient, this.listing._id).subscribe({
      next: () => {
        this.router.navigate(['/messages']);
      },
      error: (e: Error) => {
        this.handleError(e)
      }
    });

  }

  private handleError(e: Error): void {
    console.error(e);
  }

}
