import { CategorieService } from './../../services/categorie.service';
import { Item } from './../../models/item.model';
import { ItemService } from './../../services/item.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  title = 'Add Item';

  categories: any[] = [];
  regiForm: FormGroup;
  item: Item | undefined;

  constructor(
    private fb: FormBuilder,
    private serviceItems: ItemService,
    private serviceCategorie: CategorieService,
    public dialogRef: MatDialogRef<ItemComponent>
  ) {
    this.regiForm = this.fb.group({
      Title: [null, Validators.required],
      Description: [this.item?.description, Validators.required],
      Price: [this.item?.price, Validators.required],
      UrlImage: [this.item?.urlImage, Validators.required],
      Categorie: [this.item?.categorie, Validators.required],
    });
  }

  ngOnInit(): void {
    this.serviceCategorie
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onSubmit(form: any) {
    console.log(form);
    if (this.regiForm.valid) {
      let item: Item = {
        id: this.item?.id ? this.item?.id : '',
        title: form.Title,
        description: form.Description,
        categorie: form.Categorie,
        price: form.Price,
        urlImage: form.UrlImage,
      };

      console.log("break");
      if (this.item?.id) {
        this.serviceItems.updateItem(item).then(() => {
          this.dialogRef.close();
        });
      } else {
        this.serviceItems.addItem(item).then(() => {
          this.dialogRef.close();
        });
      }

    }
  }

  fillForm(item: Item): void {
    this.item = item;
    this.regiForm.get('Title')?.setValue(item.title);
    this.regiForm.get('Description')?.setValue(item.description);
    this.regiForm.get('Price')?.setValue(item.price);
    this.regiForm.get('UrlImage')?.setValue(item.urlImage);
    this.regiForm.get('Categorie')?.setValue(item.categorie);
  }
}
