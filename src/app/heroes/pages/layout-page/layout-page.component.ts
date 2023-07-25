import { Component } from '@angular/core';

@Component({
  selector: 'hero-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: "Hero list", icon: "label", url: "./list"},
    { label: "Add hero", icon: "add", url: "./add-hero"},
    { label: "Search", icon: "search", url: "./search"},
  ]

}
