import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Add Note',
        icon: 'pi pi-plus',
        routerLink: 'notes/add',
      },
      {
        label: 'See your Notes',
        icon: 'pi pi-book',
        routerLink: 'notes/list',
      },
    ];
  }
}
