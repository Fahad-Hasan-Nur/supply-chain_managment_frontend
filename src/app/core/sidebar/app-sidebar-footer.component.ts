import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'ast-sidebar-footer',
  template: `<ng-content></ng-content>`
})
export class AppSidebarFooterComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef
  ) {
    renderer.addClass(hostElement.nativeElement, 'ast-sidebar-footer');
  }

  ngOnInit() { }
}
