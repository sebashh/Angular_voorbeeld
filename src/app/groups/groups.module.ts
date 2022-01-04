import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups.routing.module';
import {GroupListComponent} from '@app/groups/grouplist/group.list.component';
import {GroupNewComponent} from '@app/groups/groupnew/group.new.component';
import {NgbActiveModal, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutComponent} from '@app/groups/layout/layout.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TicketsComponent} from '@app/groups/tickets/tickets.component';
import {GroupEditComponent} from '@app/groups/groupedit/group.edit.component';
import {MemberAddComponent} from '@app/groups/members/memberadd/member.add.component';
import { MemberEditComponent } from '@app/groups/members/memberedit/member.edit.component';
import { MembersComponent } from '@app/groups/members/members.component';
import { BorrowComponent } from '@app/groups/tickets/borrow/borrow.component';
import { MemberBorrowComponent } from './tickets/borrow/member-borrow/member-borrow.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AssignComponent } from './tickets/borrow/member-borrow/assign/assign.component';
import { TakeinComponent } from './tickets/borrow/member-borrow/takein/takein.component';
import { SelectableTicketsComponent } from './tickets/selectable-tickets/selectable-tickets.component';
import {SelectableBorrowsComponent} from '@app/groups/tickets/borrow/member-borrow/takein/selectable-borrows/selectable-borrows.component';
import {NewTicketComponent} from '@app/groups/tickets/new-ticket/new-ticket.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    NgbPaginationModule,
    MatTabsModule,
    MatCheckboxModule,
    NgbModule,
  ],
  declarations: [
    GroupListComponent,
    GroupNewComponent,
    GroupEditComponent,
    LayoutComponent,
    TicketsComponent,
    NewTicketComponent,
    MembersComponent,
    BorrowComponent,
    MemberAddComponent,
    MemberEditComponent,
    MemberBorrowComponent,
    AssignComponent,
    TakeinComponent,
    SelectableTicketsComponent,
    SelectableBorrowsComponent
  ],
  providers: [
    NgbActiveModal,

  ]
})
export class GroupsModule { }
