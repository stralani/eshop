import { ItemComponent } from './components/item/item.component';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-ui.module';
import { NgModule } from '@angular/core';
import { ItemsComponent } from './components/items/items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [MaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [],
  declarations: [ItemsComponent, ItemComponent],
  exports: [],
  bootstrap: []
})
export class ItemsModule { }
