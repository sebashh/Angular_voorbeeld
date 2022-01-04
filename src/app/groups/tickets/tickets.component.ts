import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Ticket} from '@app/_models/ticket';
import {TicketsService} from '@app/_services/tickets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '@app/_services/modal.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  ticketList!: Array<Ticket>;
  groupId!: string;
  deleteConfirmText = 'Weet je zeker dat je dit lot wilt verwijderen';

  constructor(
    private modalRef: NgbActiveModal,
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit(): void
  {
    this.groupId = this.route.parent?.snapshot.params.groupId;
    this.ticketsService.list(this.groupId).subscribe(res => {
      this.ticketList = res;

    }, error => {
    });
  }
  openCreateModal(): void {
    this.modalService.openModal('new ticket', this.groupId, (ticket: Ticket ) => {
      this.ticketList.push(ticket);
    });
  }

  deleteTicket(ticketId: string, groupId: string): void{
    if (confirm(this.deleteConfirmText)) {
      this.ticketsService.removeTicket(groupId, ticketId)
        .subscribe(() => {
          this.ticketList = this.ticketList.filter(ticketList => ticketList.id !== ticketId);
        });
    }
  }
}
