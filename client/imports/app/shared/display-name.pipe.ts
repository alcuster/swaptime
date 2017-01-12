import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { User } from '../../../../both/models/user.model';

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {
  transform(user: User): string {
    if (!user) {
      return '';
    }

    if (user.profile.displayname) {
      return user.profile.displayname;
    }

    return '';
  }
}
