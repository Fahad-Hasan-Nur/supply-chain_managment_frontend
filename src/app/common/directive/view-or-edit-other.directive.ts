import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';
import {StateService} from "../service/state.service";

@Directive({
  selector: '[appViewOrEditOther]'
})
export class ViewOrEditOtherDirective implements AfterViewInit{

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private  stateService: StateService) {
  }

  ngAfterViewInit(): void{
    if(this.stateService.getIsView())
    this.renderer.setStyle(this.elementRef.nativeElement,'display','none')
  }
}
