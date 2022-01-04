import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupListComponent} from '@app/groups/grouplist/group.list.component';
import {LayoutComponent} from '@app/groups/layout/layout.component';
import {TicketsComponent} from './tickets/tickets.component';
import {MembersComponent} from './members/members.component';
import {BorrowComponent} from './tickets/borrow/borrow.component';
import {MemberBorrowComponent} from '@app/groups/tickets/borrow/member-borrow/member-borrow.component';
import {MemberResolver} from '@app/_resolvers/member.resolver';
import {BorrowsForMemberResolver} from '@app/_resolvers/borrow-for-member.resolver';
import {UnassignedTicketsInGroupResolver} from '@app/_resolvers/unassigned-tickets-in-group.resolver';
import {AssignComponent} from '@app/groups/tickets/borrow/member-borrow/assign/assign.component';
import {TakeinComponent} from '@app/groups/tickets/borrow/member-borrow/takein/takein.component';
import {MembersResolver} from '@app/_resolvers/members.resolver';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent
  },
  {
    path: ':groupId',
    component: LayoutComponent,
    children: [
      {
        path: 'loten',
        component: TicketsComponent,
      },
      {
        path: 'leden',
        component: MembersComponent,
        resolve: {
          members: MembersResolver
        }
      },
      {
        path: 'leningen',
        component: BorrowComponent,
        children: [
          {
            path: ':memberId',
            component: MemberBorrowComponent,
            resolve: {
              member: MemberResolver,
            },
            children: [
              {
                path: '',
                component: TakeinComponent,
                resolve: {
                  borrows: BorrowsForMemberResolver
                }
              },
              {
                path: 'uitlenen',
                component: AssignComponent,
                resolve: {
                  unassignedTickets: UnassignedTicketsInGroupResolver
                }
              }
            ]
          },
        ]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
