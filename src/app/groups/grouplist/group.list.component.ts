import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '@app/_services/modal.service';
import {GroupService} from "@app/_services/group.service";
import {GroupUserResult} from "@app/_dto/groupuserresult.dto";
import {Group} from '@app/_models';

@Component({
  selector: 'app-groups',
  templateUrl: './group.list.component.html',
  styleUrls: ['./group.list.component.scss']
})
export class GroupListComponent implements OnInit {
  groupList: GroupUserResult[] = [];
  page = 1;
  pageSize = 5;
  deleteConfirmText = 'Weet je zeker dat je de groep wilt verwijderen';

  constructor(private modalService: ModalService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getMyGroups()
      .subscribe((res) => {
        this.groupList = res;
      });
  }

  openEditModal(group?: GroupUserResult): void {
    this.modalService.openModal('edit group', group, (data: Group) => {
      const position = this.groupList.findIndex(gu => gu.group.id === data.id);
      this.groupList[position].group = data;
    });
  }

  openNewGroupModal(): void {
    this.modalService.openModal('new group', undefined, (data: GroupUserResult) => {
      this.groupList.push(data);
    });
  }

  deleteGroup(id: any): void {
    if (confirm(this.deleteConfirmText)) {
      this.groupService.deleteGroup(id)
        .subscribe(() => {
          this.groupList = this.groupList.filter(groupUser => groupUser.group.id !== id);
        });
    }
  }
}
