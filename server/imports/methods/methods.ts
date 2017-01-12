import { Meteor } from 'meteor/meteor';
import { ListingsCollection } from '../../../both/collections/listings.collection';
import { Listing } from '../../../both/models/listing.model';
import { Chats } from '../../../both/collections/chats.collection';
import { Messages } from '../../../both/collections/messages.collection';
import { Spring2017 } from '../../../both/collections/spring2017.collection';
import { check, Match } from 'meteor/check';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addListing(listing: Listing): void {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged in to create a new listing.');

    ListingsCollection.collection.insert(listing);
  },
  addChat(receiverId: string, listing: Listing): void {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged in to create a new chat.');

    check(receiverId, nonEmptyString);

    if (receiverId == this.userId) throw new Meteor.Error('illegal-receiver',
      'Receiver must be different than the currently logged in user.');

    const chatExists = !!Chats.collection.find({
      topic: listing
    }).count();

    if (chatExists) throw new Meteor.Error('chat-exists',
      'Chat already exists.');

    const chat = {
      memberIds: [this.userId, receiverId],
      topic: listing,
      createdAt: new Date()
    };

    Chats.insert(chat);
  },
  addMessage(chatId: string, content: string): void {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged in to send a message.');
    check(chatId, nonEmptyString);
    check(content, nonEmptyString);

    const chatExists = !!Chats.collection.find(chatId).count();

    if (!chatExists) throw new Meteor.Error('chat-not-exists',
      'Chat doesn\'t exist');

    Messages.collection.insert({
      chatId: chatId,
      senderId: this.userId,
      content: content,
      createdAt: new Date()
    });
  },
  getCourses() {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged in to query courses DB.');

    return Spring2017.collection.find().fetch();
  }
});
