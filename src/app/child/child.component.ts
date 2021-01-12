import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactoryResolver, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { generate } from 'rxjs';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnInit, OnChanges {
  @Input() callComp: boolean;
  @Input() formattedText: string;
  @ViewChild("insert", { read: ViewContainerRef }) vf: ViewContainerRef;
  @Output() fireMessage: EventEmitter<any> = new EventEmitter();

  //This is Dynamic Rendering
  //@ViewChild('second',{read:ViewContainerRef}) svf : ViewContainerRef;

  compRef;
  genCom;
  componentOnDemand;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.generateDynamicComp(this.formattedText, this.fireMessage);

    // if(changes.callComp.currentValue){
    //   this.callComp = changes.callComp.currentValue;

    //   let secondComp = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    //  this.compRef= this.vf.createComponent(secondComp);
    //  //this.compRef.instance.formattedText = 'This is test <element> textInput name="firstInput" required="true" maxLength="4" minLength="2"</element>'
    //  this.compRef.instance.value = 1;
    //   this.compRef.instance.throwVal.subscribe(response=>{alert(response)})

    // }else{
    // this.compRef.destroy();
    //}
  }

  ngOnInit() {
    //This is Dynamic Rendering . . .
    // let secondComp = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    // this.compRef= this.svf.createComponent(secondComp);
    // //this.compRef.instance.formattedText = 'This is test <element> textInput name="firstInput" required="true" maxLength="4" minLength="2"</element>'
    // this.compRef.instance.value = 1;
    //  this.compRef.instance.throwVal.subscribe(response=>{alert(response)})
  }
  //This function generates a dynamic component using JIT Compiler on run time . . .
  generateDynamicComp(value: string, emitter: EventEmitter<any>) {
    const componentOnDemand: any = Component({
      template: value,
    })(
      class componentOnDemand implements OnInit {
        constructor() {}
        ngOnInit() {
          emitter.emit("Fired from dynamic component" + value);
        }
      }
    );
    const dynamicModule = NgModule({
      imports: [CommonModule, FormsModule, BrowserModule],
      declarations: [componentOnDemand],
    })(class DynamicModule {});
    this.compiler
      .compileModuleAndAllComponentsAsync(dynamicModule)
      .then((factories) => {
        const factory = factories.componentFactories.find(
          (component) => component.componentType === componentOnDemand
        );
        this.vf.remove();
        this.vf.createComponent(factory);
      });
  }
  ngAfterViewInit() {}
}
