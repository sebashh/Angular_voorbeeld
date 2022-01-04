import {Ticket} from '@app/_models/ticket';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TicketsService} from '@app/_services/tickets.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnassignedTicketsInGroupResolver implements Resolve<Ticket[]> {

  constructor(private ticketsService: TicketsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket[]> | Promise<Ticket[]> | Ticket[] {
    const groupId = route.parent?.parent?.parent?.params.groupId;
    return this.ticketsService.listUnassigned(groupId);
  }

}
