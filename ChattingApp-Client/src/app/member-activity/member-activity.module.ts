import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DateAgoPipe } from 'shared/pipe/date-ago.pipe';
import { SharedModule } from 'shared/shared.module';

import { ListsComponent } from './lists/lists.component';
import { MemberActivityRoutingModule } from './member-activity-routing.module';
import { MemberActivityComponent } from './member-activity.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { CardComponent } from './members/member-details/card/card.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { TabComponent } from './members/member-details/tab/tab.component';
import { EditDetailsComponent } from './members/member-edit/edit-details/edit-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/member-edit/photo-editor/photo-editor.component';
import { ProfileCardComponent } from './members/member-edit/profile-card/profile-card.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    MemberActivityComponent,
    ListsComponent,
    MemberListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    CardComponent,
    TabComponent,
    MemberEditComponent,
    ProfileCardComponent,
    EditDetailsComponent,
    PhotoEditorComponent,
    DateAgoPipe,
  ],
  imports: [
    SharedModule,
    MemberActivityRoutingModule,
    AlertModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
})
export class MemberActivityModule {}
