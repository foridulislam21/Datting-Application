import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/guards/auth.guard';
import { PreventUnsaveChangesGuard } from 'shared/guards/prevent-unsave-changes.guard';
import { MemberDetailResolver } from 'shared/resolvers/member-detail-resolver';
import { MemberEditResolver } from 'shared/resolvers/member-edit-resolver';
import { MemberListResolver } from 'shared/resolvers/member-list-resolver';

import { ListsComponent } from './lists/lists.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsResolver } from 'shared/resolvers/lists.resolver';

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
      {
        path: 'member-edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsaveChangesGuard],
      },
      { path: 'messages', component: MessagesComponent },
      {
        path: 'lists',
        component: ListsComponent,
        resolve: { users: ListsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberActivityRoutingModule {}
