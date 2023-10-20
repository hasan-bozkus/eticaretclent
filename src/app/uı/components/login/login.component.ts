import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Token_Response } from '../../../contracts/token/token_response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService,
    private authService: AuthService, private activatadRoute: ActivatedRoute,
    private router: Router, private socialAuthService: SocialAuthService,
    private httpClientService: HttpClientService) {

    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.Cog);
      await userService.googleLogin(user, () => {
        this.authService.identityCheck();

        this.hideSpinner(SpinnerType.Cog);

      });
    });

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
