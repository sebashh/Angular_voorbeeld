import {Injectable} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {GroupNewComponent} from '@app/groups/groupnew/group.new.component';
import {NewTicketComponent} from '@app/groups/tickets/new-ticket/new-ticket.component';
import {GroupEditComponent} from '@app/groups/groupedit/group.edit.component';
import {MemberAddComponent} from '@app/groups/members/memberadd/member.add.component';
import {MemberEditComponent} from '@app/groups/members/memberedit/member.edit.component';

@Injectable({providedIn: 'root'})
export class ModalService {
  private modalRef!: NgbModalRef;
  constructor(  private modalService: NgbModal) { }


  openModal(modalName: string, info?: any, results?: (value: any) => void ): void {
    switch (modalName) {
      case 'new ticket':
        this.modalRef = this.modalService.open(NewTicketComponent);
        this.modalRef.componentInstance.groupId = info;
        this.modalRef.componentInstance.ticketCreated.subscribe((data: any) => {
          if (results){
            results(data);
          }
        });
        break;
      case 'new group':
        this.modalRef = this.modalService.open(GroupNewComponent);
        this.modalRef.componentInstance.newGroup.subscribe((data: any) => {
          if (results){
            results(data);
          };
        });
        break;
      case 'edit group':
        this.modalRef = this.modalService.open(GroupEditComponent);
        this.modalRef.componentInstance.groupInfo = info;
        this.modalRef.componentInstance.editedGroup.subscribe((data: any) => {
          if (results) {
            results(data);
          }
        });
        break;
      case 'add member':
        this.modalRef = this.modalService.open(MemberAddComponent);
        this.modalRef.componentInstance.groupId = info;
        this.modalRef.componentInstance.newMember.subscribe((data: any) => {
          if (results) {
            results(data);
          }
        });
        break;
      case 'edit member':
        this.modalRef = this.modalService.open(MemberEditComponent);
        this.modalRef.componentInstance.memberInfo = info;
        this.modalRef.componentInstance.editedMember.subscribe((data: any) => {
          if (results ) {
            results(data);
          }
        });
    }
  }
  closeModal(): void {
    this.modalRef.close();
  }
}
