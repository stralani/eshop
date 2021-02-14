import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCart } from './models/ShoppingCart.model';
import { Item } from './../items/models/item.model';
import { ItemService } from './../items/services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: Item[] = [];
  shoppingCart?: ShoppingCart;
  total = 0;

  constructor(private itemService: ItemService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();

    this.itemService.getAllItems().subscribe((items) => {
      this.items = [];
      this.total = 0;
      this.shoppingCart?.itemReferences.forEach((reference: string) => {
        let item = items.find(item => item.id == reference);
        if (item) {
          this.items.push({
            id: item.id,
            title: item.title,
            description: item.description,
            categorie: item.categorie,
            price: item.price,
            urlImage: item.urlImage
          });
          this.total += item.price ? +item.price : 0;
        }
      })
    });
  }

  deleteItem(index: number): void {
    let id = this.items[index].id;
    this.items.splice(index, 1);
    this.shoppingCartService.deleteItem(id);
    this.total = 0;
    for (let item of this.items) {
      this.total += item?.price ? item.price : 0;
    }
  }


}
