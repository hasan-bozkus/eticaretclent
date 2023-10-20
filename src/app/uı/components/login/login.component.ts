import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService,
    private authService: AuthService, private activatadRoute: ActivatedRoute,
    private router: Router) {

    super(spinner)

  }
  ngOnInit(): void { }

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.Cog);
    await this.userService.login(userNameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatadRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.Cog);
    });

  }
}
