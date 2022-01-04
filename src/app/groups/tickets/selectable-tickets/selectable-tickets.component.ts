import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ticket} from '@app/_models/ticket';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {TicketSelectable} from '@app/_helpers/selectable';

@Component({
  selector: 'app-selectable-tickets',
  templateUrl: './selectable-tickets.component.html'
})
export class SelectableTicketsComponent implements OnInit, OnChanges {

  @Input() tickets: Ticket[] = [];
  @Output() onSelectedTicketsChange = new EventEmitter<string[]>();

  form: FormGroup = new FormGroup({
    unassignedTickets: new FormArray([])
  });

  constructor() { }

  public get unassignedTickets(): FormGroup[] {
    return (this.form.controls.unassignedTickets as FormArray).controls as FormGroup[];
  }

  public getSelected(index: number): FormControl {
    return this.unassignedTickets[index].controls.selected as FormControl;
  }

  private createControl(ticket: Ticket): void{
    (this.form.controls.unassignedTickets as FormArray).push(new FormGroup({
      selected: new FormControl(false),
      ticketId: new FormControl(ticket.id),
      bookNumber: new FormControl(ticket.bookNumber)
    }));
  }

  ngOnInit(): void {

    this.form.valueChanges.subscribe((data) => {
      const selectedIds: string[] = [];
      data.unassignedTickets.forEach((selection: {selected: boolean, ticketId: string, bookNumber: number}) => {
        if (selection.selected) {
          selectedIds.push(selection.ticketId);
        }
      });
      this.onSelectedTicketsChange.next(selectedIds);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    (this.form.controls.unassignedTickets as FormArray).clear();
    this.tickets.forEach((item: Ticket) => {
      this.createControl(item);
    });
  }


}
