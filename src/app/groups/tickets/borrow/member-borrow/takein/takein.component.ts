import { Component, OnInit } from '@angular/core';
import {Member} from '@app/_models/member.model';
import {ActivatedRoute} from '@angular/router';
import {BorrowPeriod} from '@app/_models/borrow.model';
import {TicketSelectable} from '@app/_helpers/selectable';
import {TakeIn} from '@app/_dto/take-in.dto';
import {BorrowService} from '@app/_services/borrow.service';
import {AlertService} from '@app/_services';

@Component({
  selector: 'app-takein',
  templateUrl: './takein.component.html'
})
export class TakeinComponent implements OnInit {

  borrows: BorrowPeriod[] = [];
  groupId: string | undefined = undefined;
  member: Member | undefined = undefined;
  borrowsSelectable: TicketSelectable[] = [];
  selectedBorrows: TakeIn[] = [];
  buttonDisabled = true;

  constructor(private route: ActivatedRoute,
              private borrowService: BorrowService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.groupId = this.route.parent?.parent?.parent?.snapshot.params.groupId;
    this.route.data.subscribe((data) => {
      this.member = data.member;
      this.borrows = data.borrows;
      this.borrowsSelectable = data.borrows.map((borrow: BorrowPeriod) => {
        return {
          id: borrow.id,
          bookNumber: borrow.ticket?.bookNumber
        } as TicketSelectable;
      });
    });
  }

  onSelectChange(event: TakeIn[]): void {
    this.selectedBorrows = event;
    this.buttonDisabled = event.length === 0;
  }

  onSubmit(): void {
    if (this.selectedBorrows.length > 0) {
      this.borrowService.takeInTickets(this.groupId || '', this.selectedBorrows).subscribe((data) => {
        this.borrows = this.borrows.filter((b1) => {
          return data.findIndex((b2) => b2.borrowPeriodId === b1.id) === -1;
        });
      }, error => {
        this.alertService.error('Er ging iets mis');
      });
    }
  }
}
