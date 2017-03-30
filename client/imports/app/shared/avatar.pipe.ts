import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { User } from '../../../../both/models/user.model';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {
  transform(user: User): string {
    if (!user) {
      return '';
    }

    if (user.profile.avatar) {
      return user.profile.avatar;
    }

    return 'https://s3.amazonaws.com/swaptime/default_avatar.png';
  }
}
