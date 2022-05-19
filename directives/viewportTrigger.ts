import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appViewportTrigger]'
})
export class ViewportTriggerDirective implements AfterViewInit {

  @Input("topLimit") top: number = 0;
  @Input("bottomLimit") bottom: number = 0;
  @Output("viewportAction") action = new EventEmitter<boolean>();  
  currentlyActive: boolean = false;

  topLimit = 1;
  bottomLimit = -1;

  constructor(private el: ElementRef) {}

  @HostListener("window:scroll")
  notify(){
    if(window.scrollY >= this.topLimit && window.scrollY <= this.bottomLimit){
      if(!this.currentlyActive){
        this.action.emit(this.currentlyActive = true);
      }
    }
    else{
      if(this.currentlyActive){
        this.action.emit(this.currentlyActive = false);
      }
    }
  }

  ngAfterViewInit(): void {
    const topDistance = this.el.nativeElement.getBoundingClientRect().top
    this.topLimit = topDistance + this.top - window.innerHeight;
    this.bottomLimit = topDistance  + this.el.nativeElement.offsetHeight + this.bottom;
    this.notify();
  }
}
