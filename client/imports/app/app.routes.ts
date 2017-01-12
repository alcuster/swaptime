import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course/course.component';
import { DetailsComponent } from './details/details.component';
import { ListingsComponent } from './listings/listings.component';
import { OwnListingsComponent } from './ownlistings/ownlistings.component';
import { SubmitComponent } from './submit/submit.component';
import { MessagesPage } from './chat/messages-page.component';
import { ChatsComponent } from './chats/chats.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
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
  { path: 'login',
    component: LoginComponent
  },
  { path: 'signup',
    component: SignupComponent
  },
  { path: 'about',
    component: AboutComponent
  }
];

export const routing = RouterModule.forRoot(routes);
