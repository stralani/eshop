import { ShoppingCart } from './../models/ShoppingCart.model';
import { Item } from '../../items/models/item.model';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private numberOfItems: BehaviorSubject<number>;
  numberOfItems$: Observable<number>;

  constructor() {
    let shoppingCartJson = localStorage.getItem('shoppingCart');

    // There are items already in the local storage
    if(shoppingCartJson) {
      let shoppingCart = JSON.parse(shoppingCartJson) as ShoppingCart;
      this.numberOfItems = new BehaviorSubject(shoppingCart.itemReferences.length);
    } else {
      this.numberOfItems = new BehaviorSubject(0);
    }

    this.numberOfItems$ = this.numberOfItems.asObservable();
   }

   getShoppingCart(): ShoppingCart | undefined {
    let shoppingCartJson = localStorage.getItem('shoppingCart');

    // There are items already in the local storage
    if(shoppingCartJson) {
      return JSON.parse(shoppingCartJson) as ShoppingCart;
    }
    return undefined;
   }

  addItem(item: Item): void {
    let shoppingCartJson = localStorage.getItem('shoppingCart');

    // There are items already in the local storage
    if(shoppingCartJson) {
      let shoppingCart = JSON.parse(shoppingCartJson) as ShoppingCart;
      shoppingCart.itemReferences.push(item.id);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      this.numberOfItems.next(shoppingCart.itemReferences.length);
    // local storage is empty
    } else {
      let itemReferences = [item.id];
      let shoppingCart: ShoppingCart = { itemReferences: itemReferences };
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      this.numberOfItems.next(shoppingCart.itemReferences.length);
    }
  }

  deleteItem(id: string): void {
    let shoppingCartJson = localStorage.getItem('shoppingCart');

    // There are items already in the local storage
    if(shoppingCartJson) {
      let shoppingCart = JSON.parse(shoppingCartJson) as ShoppingCart;
      shoppingCart.itemReferences = shoppingCart.itemReferences.filter(ref => ref !== id);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      this.numberOfItems.next(shoppingCart.itemReferences.length);
    }
  }
}
