import { MenuTopComponent } from './modules/menu/components/menu-top/menu-top.component';
import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;

  constructor(private db:AngularFireDatabase){

  }

  ngOnInit(){
this.db.list('/itmes').valueChanges().subscribe(courses=>console.log(courses));
  }
}
