import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidenavService {
  // Observable string sources
  private toggleRequestedSource = new Subject<string>();

  // // Observable string streams
  toggleRequested$ = this.toggleRequestedSource.asObservable();

  requestToggle() {
    this.toggleRequestedSource.next('toggle');
  }
}
