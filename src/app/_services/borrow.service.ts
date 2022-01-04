import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BorrowPeriod} from '@app/_models/borrow.model';
import {Observable} from 'rxjs';
import {TakeIn} from '@app/_dto/take-in.dto';
import {TakeInReturn} from '@app/_dto/take-in-return.dto';

const baseUrl = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  constructor(private http: HttpClient) {
  }

  getMemberTickets(groupId: string, memberId: string): Observable<BorrowPeriod[]>{
    return this.http.get<BorrowPeriod[]>(`${baseUrl}/groups/${groupId}/borrows/member/${memberId}`);
  }

  assignTicketsToMember(groupId: string, memberId: string, ticketsIds: string[]): Observable<BorrowPeriod[]> {
    const periods: BorrowPeriod[] = [];
    ticketsIds.forEach((ticketId) => {
      periods.push({
        ticketId,
        memberId
      } as BorrowPeriod);
    });
    return this.http.post<BorrowPeriod[]>(`${baseUrl}/groups/${groupId}/borrows`, periods);

  }

  takeInTickets(groupId: string, takeIns: TakeIn[]): Observable<TakeInReturn[]> {
    return this.http.post<TakeInReturn[]>(`${baseUrl}/groups/${groupId}/borrows/takein`, takeIns);
  }

}
