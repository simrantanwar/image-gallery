import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  isOpen: boolean = false;

  @ViewChild('sideNav', { static: true }) sideNav: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  openSideMenu() {
    this.isOpen=true;
    this.renderer.setStyle(this.sideNav.nativeElement, 'width', '200px');
  }

  closeSideMenu() {
    this.isOpen=false;
    this.renderer.setStyle(this.sideNav.nativeElement, 'width', '50px');
  }
}
