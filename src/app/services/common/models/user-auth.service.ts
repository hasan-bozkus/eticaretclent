import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token_Response } from '../../../contracts/token/token_response';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpCilentService: HttpClientService, private toastrService: CustomToastrService) {

  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | Token_Response> = this.httpCilentService.post<any | Token_Response>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password });

    const tokenResponse: Token_Response = await firstValueFrom(observable) as Token_Response;

    if (tokenResponse)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

    this.toastrService.message("Kullanıcı girişi başarılı...", "Giriş Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });

    callBackFunction();
  };

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | Token_Response> = this.httpCilentService.post<SocialUser | Token_Response>({
      action: "googlelogin",
      controller: "auth"
    }, user);

    const tokenResponse: Token_Response = await firstValueFrom(observable) as Token_Response;

    if (tokenResponse)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

    this.toastrService.message("Google ile giriş sağlanmıştır.", "Oturum Açıldı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | Token_Response> = this.httpCilentService.post<SocialUser | Token_Response>({
      controller: "auth",
      action: "facebooklogin"
    }, user);

    const tokenResponse: Token_Response = await firstValueFrom(observable) as Token_Response;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.toastrService.message("Facebook ile giriş sağlanmıştır.", "Outurum Açıldı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }

    callBackFunction();
  }

}
