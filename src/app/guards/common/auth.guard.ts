import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.Cog);

    const token: string = localStorage.getItem("accessToken");
    //const decodeToken = this.jwtHelper.decodeToken(token);
    /*const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);*/
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    }
    catch {
      expired = true;
    }

    if (!token || expired) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Lütfen oturum açın...", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
    }

    this.spinner.hide(SpinnerType.Cog);
    return true;
  }

};

