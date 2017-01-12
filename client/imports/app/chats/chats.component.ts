import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Chat } from '../../../../both/models/chat.model';
import * as moment from 'moment';
import template from './chats.component.html';
import style from "./chats.component.scss";
//import {InjectUser} from 'angular2-meteor-accounts-ui';
import {Chats} from "../../../../both/collections/chats.collection";
import {Message} from "../../../../both/models/message.model";
import {Messages} from "../../../../both/collections/messages.collection";
import {MessagesPage} from '../chat/messages-page.component';

@Component({
  selector: 'chats',
  template,
  styles: [ style ]
})
//@InjectUser('user')
export class ChatsComponent implements OnInit {
  chats: Observable<Chat[]>;
  senderId: string;

  constructor() {

  }

  ngOnInit() {
    this.senderId = Meteor.userId();

    MeteorObservable.subscribe('chats').subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.chats = Chats
          .find({})
          .mergeMap(chats =>
            Observable.combineLatest(
              ...chats.map(chat =>

                Messages.find({ chatId: chat._id }, { sort: { createdAt: -1 }, limit: 1 })
                  .startWith(null)
                  .map(messages => {
                    if (messages) chat.lastMessage = messages[0];
                    const receiver = Meteor.users.findOne(chat.memberIds.find(memberId => memberId !== this.senderId))
                    chat.title = receiver.profile.displayname;
                    return chat;
                  })

              )
            )
          //).zone();
          ).map(chats => {
          chats.forEach(chat => {
              //const receiver = Meteor.users.findOne(chat.memberIds.find(memberId => memberId !== this.senderId))
              //console.log('hi from the other side');
              //chat.title = receiver.profile.displayname;
            });

            return chats;
          }).zone();
      });
    });
  }

}
