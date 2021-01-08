import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit,OnChanges {
@Input() callComp : boolean;
@ViewChild('insert',{read:ViewContainerRef}) vf : ViewContainerRef;
compRef;genCom;
  constructor(private componentFactoryResolver:ComponentFactoryResolver) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
  if(changes.callComp.currentValue){
    let secondComp = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
   this.compRef= this.vf.createComponent(secondComp);
   this.compRef.instance.value = 1;
    this.compRef.instance.throwVal.subscribe(response=>{alert(response)})

  }else{
    this.compRef.destroy();
  }
  }

  ngOnInit() {
 
  }
ngAfterViewInit(){


}
}
