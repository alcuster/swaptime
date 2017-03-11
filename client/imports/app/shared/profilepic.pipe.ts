import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { User } from '../../../../both/models/user.model';

@Pipe({
  name: 'profilePic'
})
export class ProfilePicPipe implements PipeTransform {
  transform(user: User): string {
    if (!user) {
      return '';
    }

    if (user.profile.picture) {
      return user.profile.picture;
    }

    return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=You&w=350&h=350';
  }
}
