import { Injectable } from '@angular/core';
import { MeteorObservable, ObservableCursor } from "meteor-rxjs";
import { Observable } from'rxjs';
import { Spring2017 } from "../../../../both/collections/spring2017.collection";
import { Listing } from "../../../../both/models/listing.model";
import { ListingsCollection } from "../../../../both/collections/listings.collection";
import { Chats } from '../../../../both/collections/chats.collection';

@Injectable()
export class ListingService {
  //private data: ObservableCursor<Listing>;
  private listings: any;

  constructor() { }

  getData(): ObservableCursor<Listing> {
    return ListingsCollection.find({}, {
      sort: {
        createdAt: -1
      }
    });
  }

  getMine(user): ObservableCursor<Listing> {
    return ListingsCollection.find({
      owner: user
    }, {
      sort: {
        createdAt: -1
      }
    });
  }

  getFromDB(query) {
    return ListingsCollection.findOne({_id: query});
  }

  getChatFromDB(query) {
    return Chats.findOne({_id: query});
  }

  submitToDB(listing, userId, userName) {
    const newListing: Listing = Object.assign({}, listing, { owner: userId, ownerName: userName, createdAt: new Date()});
    MeteorObservable.call('addListing', newListing).subscribe(() => {
      console.log('Listing successfully added.');
    }, (error) => {
      console.error('Error: ', error);
    });
  }

  isOwner(listing: Listing, user: Meteor.User): boolean {
    return user && user._id === listing.owner;
  }

  deleteFromDB(listing, user) {
    if (this.isOwner(listing, user)) {
      ListingsCollection.remove(listing._id);
    } else {
      alert('Cannot delete a listing you do not own.');
      return;
    }
  }

}
