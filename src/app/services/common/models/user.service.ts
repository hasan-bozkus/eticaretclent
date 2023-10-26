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

 
}
