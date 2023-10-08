import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { DialogService } from '../../services/common/dialog.service';

declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export default class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
      const img = _renderer.createElement("img");
      img.setAttribute("src", "../../../../../assets/deletedicon.png");
      img.setAttribute("style", "cursor: pointer");
      img.width = 25;
      img.height = 25;
      _renderer.appendChild(element.nativeElement, img);
     }

     @Input() id: string;
     @Input() controller: string;

     @Output() callBack: EventEmitter<any> = new EventEmitter();

     @HostListener('click')
     async onclick() {
       this.dialogService.openDialog({
         componentType: DeleteDialogComponent,
         data: DeleteState.Yes,
         afterClosed: async () => {
           this.spinner.show(SpinnerType.Cog);
           const td: HTMLTableCellElement = this.element.nativeElement;

           this.httpClientService.delete({
             controller: this.controller
           }, this.id).subscribe(data => {

             $(td.parentElement).animate({
               opacity: 0,
               left: "+=50",
               height: "toogle"
             }, 700, () => {
               this.callBack.emit();
               this.alertifyService.message("Ürün başarıyla silinmiştir.", {
                 dismissOthers: true,
                 messageType: MessageType.Success,
                 position: Position.TopRight
               });
             });
           }, (errorResponse: HttpErrorResponse) => {
             this.spinner.hide(SpinnerType.Cog);
             this.alertifyService.message("Ürün silinirken beklenmedik bir hata ile karşılaştık.", {
               dismissOthers: true,
               messageType: MessageType.Error,
               position: Position.TopRight
             });
           });
         }
       });
      
     }

     //openDialog(afterclosed: any): void {
     // const dialogRef = this.dialog.open(DeleteDialogComponent, {
     //   width:'250px',
     //   data: DeleteState.Yes,
     // });
  
     // dialogRef.afterClosed().subscribe(result => {
     //   if(result == DeleteState.Yes)
     //   {
     //     afterclosed();
     //   }
     // });
    /*}*/
  

}
function OutPut(target: DeleteDirective, propertyKey: 'onclick', descriptor: TypedPropertyDescriptor<() => void>): void | TypedPropertyDescriptor<() => void> {
  throw new Error('Function not implemented.');
}

