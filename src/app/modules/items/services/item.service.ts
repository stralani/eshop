import { Observable } from 'rxjs';
import { Item } from './../models/item.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private db: AngularFireDatabase) { }

  getAllItems(): Observable<Item[]> {
    return this.db
      .list('itmes')
      .valueChanges(undefined, { idField: 'id' }) as Observable<Item[]>;
  }

  addItem(item: Item) {
    return this.db.list('/itmes/').push({
      title: item.title,
      description: item.description,
      categorie: item.categorie,
      price: item.price,
      urlImage: item.urlImage,
    });
  }

  updateItem(item: Item) {
    return this.db.list('/itmes/').update(item.id, {
      title: item.title,
      description: item.description,
      categorie: item.categorie,
      price: item.price,
      urlImage: item.urlImage,
    });
  }
  // deleteCourse(id:string)
  // {
  //   return this.db.object('/itmes/'+id).remove();
  // }

  getItemById(id: String) {
    return this.db.list('itmes' + id).valueChanges();
  }

  deleteItemById(id: string) {
    return this.db.list('itmes').remove(id);
  }
}
