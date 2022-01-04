import { Component, OnInit } from '@angular/core';
import {AccountService} from "@app/_services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user = this.accountService.accountValue;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
