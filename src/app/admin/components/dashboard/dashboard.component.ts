import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from '../../../services/common/signalr.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private signalRService: SignalRService) {
    super(spinner);

    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopRight
      })
    });
  }

  m() {

    this.alertify.message("SelamünAlayküm", {
      messageType: MessageType.Success,
      delay: 5,
      position: Position.TopRight,
      dismissOthers: false
    })
  }

  d() {
    this.alertify.dismiss();
  }
}
