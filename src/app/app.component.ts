import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '@app/_services';
import {User, Role} from '@app/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  Role = Role;
  user!: User;

  title = 'lotenbeheer-front-end';

  color = 'onbekend';

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((user) => this.user = user);
    this.accountService.checkLogin();
  }
}
