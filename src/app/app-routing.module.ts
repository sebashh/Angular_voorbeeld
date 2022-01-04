import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const groupsModule = () => import('./groups/groups.module').then(x => x.GroupsModule);

const routes: Routes = [
  { path: '', loadChildren: groupsModule, canActivate: [AuthGuard]},
  { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

