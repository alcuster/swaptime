import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { MomentModule } from 'angular2-moment';
import { MaterialModule } from '@angular/material'; //import Angular Material 2

//PrimeNG UI Components
import { DropdownModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';

//Responsive UI
import { ResponsiveModule } from 'ng2-responsive';

import { routing } from './app.routes';

//My components
import { AppComponent } from './app.component';
import { CourseService } from './course/course.service';
import { SidenavService } from './services/sidenav.service';
import { CourseComponent } from './course/course.component';
import { DetailsComponent } from './details/details.component';
import { ListingsComponent } from './listings/listings.component';
import { OwnListingsComponent } from './ownlistings/ownlistings.component';
import { SubmitComponent } from './submit/submit.component';
import { MessagesPage } from './chat/messages-page.component';
import { ChatsComponent } from './chats/chats.component';
import { LoginDialog } from './auth/logindialog.component';
import { SignupDialog } from './auth/signupdialog.component';
import { VerifyComponent } from './auth/verify.component';
import { AboutComponent } from './about/about.component';

//Pipes
import { DisplayNamePipe } from './shared/display-name.pipe';
import { TruncatePipe } from './shared/truncate.pipe';
import { ProfilePicPipe } from './shared/profilepic.pipe';
import { AvatarPipe } from './shared/avatar.pipe';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    CourseComponent,
    DetailsComponent,
    ListingsComponent,
    OwnListingsComponent,
    SubmitComponent,
    MessagesPage,
    ChatsComponent,
    LoginDialog,
    SignupDialog,
    VerifyComponent,
    AboutComponent,
    DisplayNamePipe,
    TruncatePipe,
    ProfilePicPipe,
    AvatarPipe
  ],
  // Entry Components
  entryComponents: [
    AppComponent,
    CourseComponent,
    DetailsComponent,
    ListingsComponent,
    OwnListingsComponent,
    SubmitComponent,
    MessagesPage,
    ChatsComponent,
    LoginDialog,
    SignupDialog,
    VerifyComponent,
    AboutComponent
  ],
  // Providers
  providers: [
    CourseService,
    SidenavService
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccountsModule,
    HttpModule,
    MaterialModule,
    DropdownModule,
    RadioButtonModule,
    MomentModule,
    AutoCompleteModule,
    ResponsiveModule,
    MessagesModule,
    routing
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
