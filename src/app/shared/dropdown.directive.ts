import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    openMenu = false;
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit() {}
    @HostListener('click') click(eventData: Event) {
        if (!this.openMenu) {
            this.renderer.addClass(this.elementRef.nativeElement, 'open');
            this.openMenu = true;
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'open');
            this.openMenu = false;
        }
    }
}