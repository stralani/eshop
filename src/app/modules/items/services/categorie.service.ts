import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  constructor(private db: AngularFireDatabase) { }

  getAllCategories() {
    return this.db.list('categories').valueChanges();
  }
}
