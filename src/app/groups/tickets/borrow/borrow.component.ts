import {Component, OnInit} from '@angular/core';
import {MemberService} from '@app/_services/member.service';
import {Member} from '@app/_models/member.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent implements OnInit {

  members: Member[] = [];
  groupId: string | undefined = undefined;
  errorMessage = '';
  constructor(private memberService: MemberService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      if (!params.groupId){
        this.errorMessage = 'Error: Kan groep niet laden';
      }
      this.groupId = params.groupId;
      this.memberService.getMembers(this.groupId || '').subscribe((data) => {
        this.members = data;
      });
    });
  }
}
