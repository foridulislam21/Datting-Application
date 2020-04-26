import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from 'app/member-activity/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsaveChangesGuard
  implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure, you want to continue? any unsaved changes will be lost'
      );
    }
    return true;
  }
}
