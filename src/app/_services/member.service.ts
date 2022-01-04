import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Member} from "@app/_models/member.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const baseUrl = environment.apiUrl + `/api/groups`;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getMembers(groupId: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${baseUrl}/${groupId}/Member/all`);
  }

  getMember(groupId: string, memberId: string): Observable<Member>{
    return this.http.get<Member>(`${baseUrl}/${groupId}/Member/${memberId}`);
  }

  deleteMember(groupId: string, memberId: string): Observable<Member> {
    return this.http.delete<Member>(`${baseUrl}/${groupId}/Member/${memberId}`);
  }

  addMember(groupId: string, firstName: string, lastName: string, payed: number) {
    return this.http.post<Member>(`${baseUrl}/${groupId}/Member`, {firstName, lastName, payed});
  }

  editMember(groupId: string, memberId: string, firstName: string, lastName: string, payed: number) {
    return this.http.put<Member>(`${baseUrl}/${groupId}/Member/${memberId}`, {firstName, lastName, payed, id: memberId, groupId});
  }
}
