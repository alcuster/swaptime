import { Routes, RouterModule } from '@angular/router';

import { ListingComponent } from './listing/listing.component';
import { DetailsComponent } from './details/details.component';
import { ListingsComponent } from './listings/listings.component';
import { OwnListingsComponent } from './ownlistings/ownlistings.component';
import { SubmitComponent } from './submit/submit.component';
import { MessagesPage } from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { VerifyComponent } from './auth/verify.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'listings',
    component: ListingsComponent
  },
  {
    path: 'mylistings',
    component: OwnListingsComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: '',
    redirectTo: '/listings',
    pathMatch: 'full'
  },
  {
    path: 'submit',
    component: SubmitComponent
  },
  {
    path: 'chat/:chatId',
    component: MessagesPage
  },
  {
    path: 'messages',
    component: ChatsComponent
  },
  { path: 'about',
    component: AboutComponent
  },
  { path: 'verify-email/:token',
    component: VerifyComponent
  }

];

export const routing = RouterModule.forRoot(routes);
