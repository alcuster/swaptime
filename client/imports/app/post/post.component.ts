import { Component, OnInit, Input } from '@angular/core';
import { Listing } from "../../../../both/models/listing.model";
import { TruncatePipe } from '../shared/truncate.pipe';
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

  ngOnInit() {
    let owner = Meteor.users.findOne(this.listing.owner);
    this.ownerName = owner.profile.displayname || "";
    this.profilePic = owner.profile.picture || "";
  }
}
