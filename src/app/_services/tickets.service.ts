import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '@app/_models/ticket';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {OkResponse} from '@app/_dto/ok.dto';

const baseUrl = `${environment.apiUrl}/api`;

@Injectable({ providedIn: 'root' })
export class TicketsService{

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  list(groupId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${baseUrl}/groups/${groupId}/ticket/all`);
  }

  listUnassigned(groupId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${baseUrl}/groups/${groupId}/ticket/allunassigned`);
  }
  addTicket(groupId: string, BookNumber: string): Observable<any>{
    return this.http.post<Ticket>(`${baseUrl}/groups/${groupId}/ticket`, {BookNumber});
  }
  removeTicket(groupId: string, ticketId: string): Observable<any>{
    return this.http.delete<OkResponse>(`${baseUrl}/groups/${groupId}/ticket/${ticketId}`);
}
}

