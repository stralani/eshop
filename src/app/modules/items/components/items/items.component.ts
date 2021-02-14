import { ShoppingCartService } from './../../../shopping-cart/services/shopping-cart.service';
import { CategorieService } from './../../services/categorie.service';
import { Item } from './../../models/item.model';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  categories: any[] = [];
  items: Item[] = [];

  constructor(
    private serviceCategorie: CategorieService,
    private serviceItems: ItemService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.serviceCategorie
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));

    this.serviceItems.getAllItems().subscribe((items) => {
      this.items = [];
      items.forEach((item: any) => {
        this.items.push({
          id: item.id,
          title: item.title,
          description: item.description,
          categorie: item.categorie,
          price: item.price,
          urlImage: item.urlImage
        });
      })
    });
  }

  getItemsByCategorie(key: string): any[] {
    return this.items.filter((item) => item.categorie === key);
  }

  addItem(item: Item): void {
    this.shoppingCartService.addItem(item);
  }
}
