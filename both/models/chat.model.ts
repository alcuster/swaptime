import { Message } from './message.model';
import { Listing } from './listing.model';

export interface Chat {
  _id?: string;
  memberIds?: string[];
  title?: string;
  picture?: string;
  lastMessage?: Message;
  topic?: Listing;
  createdAt?: Date;

}
