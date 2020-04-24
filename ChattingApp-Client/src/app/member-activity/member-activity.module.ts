import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberActivityRoutingModule } from './member-activity-routing.module';
import { MemberActivityComponent } from './member-activity.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { SharedModule } from 'shared/shared.module';
import { MemberDetailsComponent } from './members/member-details/member-details.component';

@NgModule({
  declarations: [
    MemberActivityComponent,
    ListsComponent,
    MemberListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, MemberActivityRoutingModule],
})
export class MemberActivityModule {}
