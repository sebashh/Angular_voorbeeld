import {Member} from '@app/_models/member.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MemberService} from '@app/_services/member.service';

@Injectable({
  providedIn: 'root'
})
export class MemberResolver implements Resolve<Member>{
  constructor(private memberService: MemberService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member> | Promise<Member> | Member {
    const groupId = route.parent?.parent?.params.groupId;
    const memberId = route.params.memberId;
    return this.memberService.getMember(groupId, memberId);
  }

}
