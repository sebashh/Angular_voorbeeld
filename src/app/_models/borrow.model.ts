import {Ticket} from '@app/_models/ticket';
import {Member} from '@app/_models/member.model';


export interface BorrowPeriod {
  id: string;
  startPeriod: Date;
  endPeriod: Date;
  sold: boolean;
  ticketId?: string;
  ticket?: Ticket;
  memberId?: string;
  member: Member;
}
