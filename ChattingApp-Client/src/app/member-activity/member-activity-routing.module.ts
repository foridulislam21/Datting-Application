import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/guards/auth.guard';

import { ListsComponent } from './lists/lists.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailResolver } from 'shared/resolvers/member-detail-resolver';
import { MemberListResolver } from 'shared/resolvers/member-list-resolver';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: 'member/:id',
        component: MemberDetailsComponent,
        resolve: { user: MemberDetailResolver },
      },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberActivityRoutingModule {}
