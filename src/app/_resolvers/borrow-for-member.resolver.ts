import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BorrowPeriod} from '@app/_models/borrow.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BorrowService} from '@app/_services/borrow.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowsForMemberResolver implements Resolve<BorrowPeriod[]> {

  constructor(private borrowService: BorrowService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BorrowPeriod[]> | Promise<BorrowPeriod[]> | BorrowPeriod[] {
    const memberId = route.parent?.params?.memberId;
    const groupId = route.parent?.parent?.parent?.params?.groupId;
    return this.borrowService.getMemberTickets(groupId, memberId);
  }

}
