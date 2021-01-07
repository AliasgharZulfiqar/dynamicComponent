import { ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core/src/render3';
import { resolve } from 'url';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
@ViewChild('insert',{read:ViewContainerRef}) vf : ViewContainerRef;
  constructor(private componentFactoryResolver:ComponentFactoryResolver) { 
  }

  ngOnInit() {
 
  }
  ngAfterViewInit(){
  setTimeout(()=>{
    let comp = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    this.vf.createComponent(comp);
   },5000)
  
}
ngOnDestroy(){

}
}
