import { Item } from './../../../items/models/item.model';
import { ItemService } from './../../../items/services/item.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from 'src/app/modules/items/components/item/item.component';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css'],
})
export class AdminItemsComponent implements OnInit {
  items: Item[] = [];
  displayedColumns: string[] = [
    'title',
    'urlImage',
    'description',
    'categorie',
    'price',
    'actions',
  ];
  db: any;
  constructor(
    private itemService: ItemService,
    private serviceDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((items) => (this.items = items));
  }

  AddItem() {
    this.serviceDialog.open(ItemComponent, {
      width: '650px',
    });
  }

  Edit(row: { id: any }) {
    console.log(row.id);
    let componentRef = this.serviceDialog.open(ItemComponent, {
      width: '650px',
      data: { id: row.id },
    });

    componentRef.componentInstance.title = 'Update Item';
    let item = this.items.filter(item => item.id == row.id)[0];
    componentRef.componentInstance.fillForm(item);
  }

  deleteRow(row: { id: any }) {
    this.itemService.deleteItemById(row.id);
  }
}
