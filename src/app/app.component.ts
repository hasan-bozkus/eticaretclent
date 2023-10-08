import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eticaretclent';
  // constructor(private toastrService: CustomToastrService){
  //   toastrService.message("SelamünAleyküm", "Hasan", {messageType: ToastrMessageType.Info, position: ToastrPosition.TopRight});
  //   toastrService.message("SelamünAleyküm", "Hasan", {messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight});
  //   toastrService.message("SelamünAleyküm", "Hasan", {messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight});
  //   toastrService.message("SelamünAleyküm", "Hasan", {messageType: ToastrMessageType.Warning, position: ToastrPosition.TopRight});
  // }
  constructor(){}
  
}

  
