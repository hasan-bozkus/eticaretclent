import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/fileupload/fileupload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string) {

    super(dialogRef)
  
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpeg, .jpg, .gif",
    actions: "upload",
    controller: "products",
    explantation: "Ürün resmini seçin veya sürükleyin...",
    İsAdminPage: true,
    queryString: `id=${this.data}`
  };

}

export enum SelectProductImageState {
 Close
}
