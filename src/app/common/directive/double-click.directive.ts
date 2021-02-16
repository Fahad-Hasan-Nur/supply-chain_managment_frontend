import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {StateService} from "../service/state.service";

@Directive({
  selector: '[appDoubleClick]'
})
export class DoubleClickDirective {

  constructor(private elementRef: ElementRef,private renderer: Renderer2 ,private stateService: StateService) { }

  @HostListener('dblclick')
  public onDoubleClick(): void{
    this.elementRef.nativeElement.readOnly = !this.elementRef.nativeElement.readOnly
    console.log(this.elementRef.nativeElement.readOnly)
    if(this.elementRef.nativeElement.readOnly === true){
      this.renderer.setStyle(this.elementRef.nativeElement,'border','0px solid')
      this.renderer.setStyle(this.elementRef.nativeElement,'borderColor','white')
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement,'border','1px solid')
      this.renderer.setStyle(this.elementRef.nativeElement,'borderColor','black')
    }
  }
}
