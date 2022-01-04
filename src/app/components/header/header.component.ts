import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {AccountService} from '@app/_services';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user!: User;
  navbarOpen = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.user.subscribe((user) => this.user = user);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.accountService.logout();
  }
}
