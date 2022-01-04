import { Component, OnInit } from '@angular/core';
import {MemberService, ModalService} from "@app/_services";
import {ActivatedRoute} from "@angular/router";
import {Member} from "@app/_models";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  groupId: string | undefined = undefined;
  members: Member[] = [];
  deleteConfirmText = 'Weet je zeker dat je dit lid wilt verwijderen?';

  constructor(private memberService: MemberService, private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit(): void {
    this.groupId = this.route.parent?.snapshot.params.groupId;
    this.route.data.subscribe((data) => {
      this.members = data.members;
    });
  }

  deleteMember(groupId: any, memberId: string): void {
    if (confirm(this.deleteConfirmText)) {
      this.memberService.deleteMember(groupId, memberId)
        .subscribe(() => {
          this.members = this.members.filter(member => member.id !== memberId);
        });
    }
  }

  openNewMemberModal(): void {
    this.modalService.openModal('add member', this.groupId, (data) => {
      this.members.push(data);
    });
  }

  openModalEdit(modalName: string, member?: Member): void {
    this.modalService.openModal(modalName, member, (updatedMember: Member) => {
      this.members[this.members.findIndex(m => m.id === updatedMember.id)] = updatedMember;
    });
  }
}

