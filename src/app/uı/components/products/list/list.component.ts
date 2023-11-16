import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService) {

  }

  products: List_Product[];
  async ngOnInit() {
    const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(0, 12,
    () => {

    }, errorMessage => {

    });
    this.products = data.products;
  }

}
