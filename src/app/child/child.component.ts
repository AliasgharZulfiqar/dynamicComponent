import { Component, ComponentFactoryResolver,ComponentRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { resolve } from 'url';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit,OnChanges {
@Input() callComp : boolean;
@ViewChild('insert',{read:ViewContainerRef}) vf : ViewContainerRef;
compRef : any;
resolve:any;
  constructor(private componentFactoryResolver:ComponentFactoryResolver) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.callComp.currentValue){
      this.resolve = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
   this.compRef  = this.vf.createComponent(this.resolve);
  
    }else{
      if(this.compRef){
      this.compRef.destroy();
      }
    }
  }

  ngOnInit() {
   
 
  }
ngAfterViewInit(){

//   this.resolve = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
//  this.compRef  = this.vf.createComponent(this.resolve);

}


}
