import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberActivityRoutingModule } from './member-activity-routing.module';
import { MemberActivityComponent } from './member-activity.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  declarations: [MemberActivityComponent, ListsComponent, MemberListComponent, MessagesComponent],
  imports: [
    CommonModule,
    MemberActivityRoutingModule
  ]
})
export class MemberActivityModule { }
