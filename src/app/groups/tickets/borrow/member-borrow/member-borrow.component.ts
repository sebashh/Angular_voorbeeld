import { Component, OnInit } from '@angular/core';
import {Member} from '@app/_models/member.model';
import {ActivatedRoute} from '@angular/router';
import {MemberService} from '@app/_services/member.service';
import {BorrowPeriod} from '@app/_models/borrow.model';

@Component({
  selector: 'app-member-borrow',
  templateUrl: './member-borrow.component.html',
  styleUrls: ['./member-borrow.component.scss']
})
export class MemberBorrowComponent implements OnInit {


  member: Member | undefined = undefined;
  borrows: BorrowPeriod[] = [];
  groupId: string | undefined = undefined;

  constructor(private memberService: MemberService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId = this.route.parent?.parent?.snapshot.params.groupId;
    this.route.data.subscribe((data) => {
      this.member = data.member;
    });
  }


}
