import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SharedModule } from 'shared/shared.module';

import { ListsComponent } from './lists/lists.component';
import { MemberActivityRoutingModule } from './member-activity-routing.module';
import { MemberActivityComponent } from './member-activity.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { CardComponent } from './members/member-details/card/card.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { TabComponent } from './members/member-details/tab/tab.component';
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
  ],
  imports: [SharedModule, MemberActivityRoutingModule, NgxGalleryModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MemberActivityModule {}
