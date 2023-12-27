import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService, private toastrService: CustomToastrService,
    private router: Router, private httpClientService: HttpClientService) {
    authService.identityCheck();

    httpClientService.get({
      controller: "baskets"
    }).subscribe(data => {
      debugger;
    });
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum Çıkış Yapıldı...", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
  
}

  
