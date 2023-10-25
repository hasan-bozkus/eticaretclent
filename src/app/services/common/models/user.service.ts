import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token_Response } from '../../../contracts/token/token_response';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCilentService: HttpClientService, private toastrService: CustomToastrService) {

  }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpCilentService.post<Create_User | User>({
      controller: "users"

    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | Token_Response> = this.httpCilentService.post<any | Token_Response>({
      controller: "users",
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
      controller: "users"
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
    const observable: Observable<SocialUser | Token_Response> =  this.httpCilentService.post<SocialUser | Token_Response>({
      controller: "users",
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
