import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Observable } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Random } from 'meteor/random';
import { Listing } from "../../../../both/models/listing.model";
import { CourseService } from '../course/course.service';
import template from './details.component.html';
import style from './details.component.scss';

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

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private zone: NgZone,
              private router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.listing = this.courseService.getFromDB(id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isOwner(listing: Listing): boolean {
    return this.user && this.user._id === listing.owner;
  }

  deleteListing() {
    this.courseService.deleteFromDB(this.listing, this.user);
  }

  addChat(recipient): void {
    if (!this.user) {
      alert("You must be logged in to contact another user.");
      return;
    }

    MeteorObservable.call('addChat', recipient).subscribe({
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
