import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Ticket} from '@app/_models/ticket';
import {TicketsService} from '@app/_services/tickets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {
  ticketList!: Array<Ticket>;
  groupId!: string;
  newTicketForm!: FormGroup;
  submitted = false;
  @Output() ticketCreated = new EventEmitter<Ticket>();


  constructor(
    private modalRef: NgbActiveModal,
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.newTicketForm = this.formBuilder.group({
      bookNumber: ['', Validators.required],
    });
  }
  get t() { return this.newTicketForm.controls; }

  addTicket() {
    this.submitted = true;
    if (this.newTicketForm.invalid) {
      return;
    }
    this.ticketsService.addTicket(this.groupId, this.t.bookNumber.value)
      .subscribe({
        next: (ticket) => {
          if (this.submitted) {
            this.ticketCreated.emit(ticket);
            this.closeModal();
          }
        },
        error: error => {
        }
      });

  }
  closeModal() {
    this.modalRef.close();
  }
}
