import { Component, OnInit, Input } from '@angular/core';
import { Listing } from "../../../../both/models/listing.model";
import { TruncatePipe } from '../shared/truncate.pipe';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';

import template from './post.component.html';
import * as moment from 'moment';

@Component({
  selector: 'post',
  template,
  styleUrls: ['./post.component.scss'],
  host: {
    class: 'row'
  }
})
export class PostComponent implements OnInit {
  @Input() listing: Listing;
  private ownerName: String;
  private profilePic: String;
  usersSub: Subscription;

  ngOnInit() {
    this.usersSub = MeteorObservable.subscribe('users').subscribe(() => {
      let owner = Meteor.users.findOne({_id: this.listing.owner});
      this.ownerName = owner.profile.displayname || "";
      this.profilePic = owner.profile.picture || "";
    });
  }
}
