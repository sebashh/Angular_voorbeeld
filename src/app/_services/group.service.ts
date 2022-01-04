import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '@app/_models';
import {GroupUserResult} from '@app/_dto/groupuserresult.dto';
import {environment} from '../../environments/environment';
import {OkResponse} from '@app/_dto/ok.dto';

const baseUrl = environment.apiUrl + `/api/Groups`;

@Injectable({ providedIn: 'root' })
export class GroupService {

  constructor(private http: HttpClient) {
  }

  getMyGroups() {
    return this.http.get<GroupUserResult[]>(`${baseUrl}/mine`);
  }

  createNewGroup(name: string, description: string, ticketPrice: number) {
    return this.http.post<GroupUserResult>(`${baseUrl}`, {name, description, ticketPrice});
  }

  editGroup(id: string, name: string, description: string, ticketPrice: number) {
    return this.http.put<Group>(`${baseUrl}/${id}`, {name, description, ticketPrice, id})
  }
  deleteGroup(id: string) {
    return this.http.delete<OkResponse>(`${baseUrl}/${id}`);
  }
}
