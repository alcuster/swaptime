import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { Observable } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { ListingService } from '../listings/listing.service';
import { Chat } from '../../../../both/models/chat.model';
import { Chats } from '../../../../both/collections/chats.collection';
import { Messages } from '../../../../both/collections/messages.collection';
import { Message } from '../../../../both/models/message.model';

import template from './chat.component.html';
import style from './chat.component.scss';

@Component({
  selector: 'chat',
  template,
  styles: [ style ]
})
export class MessagesPage implements OnInit, OnDestroy {
  private selectedChat: Chat;
  private title: string;
  private subtitle: string;
  private messages: Observable<Message[]>;
  private senderId: string;
  private message = '';

  chatId: string;
  paramsSub: Subscription;

  constructor(private route: ActivatedRoute,
              private listingService: ListingService) {
    this.senderId = Meteor.userId();
    this.paramsSub = this.route.params
      .map(params => params['chatId'])
      .subscribe(chatId => {
        let selectedId = chatId;
        this.selectedChat = this.listingService.getChatFromDB(selectedId);
      });

    //stop-gap solution; should just pass in the user name (likely as a route parameter) rather than search again
    const receiver = Meteor.users.findOne(this.selectedChat.memberIds.find(memberId => memberId !== this.senderId));
    const topic = this.selectedChat.topic;
    this.title = receiver.profile.displayname;

  }

  ngOnInit() {
    MeteorObservable.subscribe('messages', this.selectedChat._id).subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.messages = Messages.find(
          {chatId: this.selectedChat._id},
          {sort: {createdAt: 1}}
        ).map((messages: Message[]) => {
          messages.forEach((message: Message) => {
            message.ownership = this.senderId == message.senderId ? 'mine' : 'other';
          });

          return messages;
        });
      });
    });
  }

  onInputKeypress(): void {
    this.sendMessage();
  }

  sendMessage(): void {
    MeteorObservable.call('addMessage', this.selectedChat._id, this.message).zone().subscribe(() => {
      this.message = '';
    });
  }

  ngOnDestroy()  {
    this.paramsSub.unsubscribe();
  }
}
