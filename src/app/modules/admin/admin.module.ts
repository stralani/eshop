import { ItemsModule } from './../items/items.module';
import { ItemComponent } from './../items/components/item/item.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material-ui.module';
import { NgModule } from '@angular/core';
import { AdminItemsComponent } from './components/admin-items/admin-items.component';

@NgModule({
  imports: [MaterialModule, CommonModule, ItemsModule],
  providers: [],
  declarations: [AdminItemsComponent],
  exports: [AdminItemsComponent],
  entryComponents: [ItemComponent],
  bootstrap: []
})
export class AdminModule { }
