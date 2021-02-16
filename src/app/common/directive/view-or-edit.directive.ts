import {AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {StateService} from "../service/state.service";

@Directive({
  selector: '[appViewOrEdit]'
})
export class ViewOrEditDirective implements AfterViewInit{

  constructor(private elementRef: ElementRef, private renderer: Renderer2,private stateService: StateService) {
  }

  ngAfterViewInit(): void{
    if(this.stateService.getIsView()){
      this.elementRef.nativeElement.disabled = true;
      this.renderer.setStyle(this.elementRef.nativeElement,'color','black')
      this.renderer.addClass(this.elementRef.nativeElement,'underline-remove')
    }

  }
}
