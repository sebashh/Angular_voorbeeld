import { Component, OnInit } from '@angular/core';
import {Ticket} from '@app/_models/ticket';
import {ActivatedRoute, Router} from '@angular/router';
import {BorrowService} from '@app/_services/borrow.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html'
})
export class AssignComponent implements OnInit {

  buttonDisabled = true;

  groupId: string | undefined = undefined;
  memberId: string | undefined = undefined;
  tickets: Ticket[] = [];

  private selectedTickets: string[] = [];


  constructor(private route: ActivatedRoute, private borrowService: BorrowService,
              private router: Router) { }

  ngOnInit(): void {
    this.groupId = this.route.parent?.parent?.parent?.snapshot.params.groupId;
    this.memberId = this.route.parent?.snapshot.params.memberId;
    this.route.data.subscribe((data) => {
      this.tickets = data.unassignedTickets;
    });
  }

  onSubmit(): void {
    if (this.selectedTickets.length === 0) {
      return;
    }
    if (this.groupId && this.memberId){
      this.borrowService.assignTicketsToMember(this.groupId, this.memberId, this.selectedTickets).subscribe(() => {
        this.router.navigate(['../'], {
          relativeTo: this.route
        });
      });
    }
  }

  onTicketsChange(ticketIds: string[]): void {
    this.buttonDisabled = ticketIds.length === 0;
    this.selectedTickets = ticketIds;
  }
}
