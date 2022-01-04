import {Member} from '@app/_models/member.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MemberService} from '@app/_services/member.service';

@Injectable({
  providedIn: 'root'
})
export class MembersResolver implements Resolve<Member[]>{
  constructor(private memberService: MemberService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member[]> | Promise<Member[]> | Member[] {
    const groupId = route.parent?.params.groupId;
    return this.memberService.getMembers(groupId);
  }

}
