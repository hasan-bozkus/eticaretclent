import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCilentService: HttpClientService) {

  }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpCilentService.post<Create_User | User>({
      controller: "users"

    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpCilentService.post({
      controller: "users",
      action: "login"
    }, { userNameOrEmail, password });
    await firstValueFrom(observable);

    callBackFunction();
  };

}
