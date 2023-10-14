import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/fileupload/fileupload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Image } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string, private productService: ProductService,
    private spinner: NgxSpinnerService) {

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

  images: List_Product_Image[];


  async ngOnInit() {
    this.spinner.show(SpinnerType.Cog);
    this.images = await this.productService.readImage(this.data as string, () => this.spinner.hide(SpinnerType.Cog));
  }

  async deleteImage(imageId: string) {
    this.spinner.show(SpinnerType.Cog)
    await this.productService.deleteImage(this.data as string, imageId, () => this.spinner.hide(SpinnerType.Cog));
  }

}

export enum SelectProductImageState {
 Close
}
