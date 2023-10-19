import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService) {

    super(spinner)

  }
  ngOnInit(): void { }

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.Cog);
    await this.userService.login(userNameOrEmail, password, () => this.hideSpinner(SpinnerType.Cog));

  }
}
