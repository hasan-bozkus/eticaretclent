import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Token_Response } from '../../../contracts/token/token_response';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService,
    private authService: AuthService, private activatadRoute: ActivatedRoute,
    private router: Router, private socialAuthService: SocialAuthService,
    private httpClientService: HttpClientService) {

    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.Cog);

      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
          this.authService.identityCheck();

          this.hideSpinner(SpinnerType.Cog);
        });
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck();

            this.hideSpinner(SpinnerType.Cog);
          });
          break;
      }
    });

  }
  ngOnInit(): void { }

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.Cog);
    await this.userAuthService.login(userNameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatadRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.Cog);
    });

  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
