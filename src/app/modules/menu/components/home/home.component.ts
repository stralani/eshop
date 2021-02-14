import { ItemService } from './../../../items/services/item.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: any[] = [];
  proportion = 45;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getAllItems()
      .pipe(
        map(items => items.filter(item => item != null && item.urlImage != null).slice(0, 5).map(item => item.urlImage))
      )
      .subscribe(images => this.images = images);
  }

}
