import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactoryResolver, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { generate } from 'rxjs';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnInit, OnChanges {
  @Input() formattedText: string;
  @Input() demoForm: FormGroup;
  @ViewChild("insert", { read: ViewContainerRef }) vf: ViewContainerRef;
  @Input() testingForm: FormGroup;
  @Output() fireMessage: EventEmitter<any> = new EventEmitter();
  // @Input() testForm  : FormGroup;
  //This is Dynamic Rendering
  //@ViewChild('second',{read:ViewContainerRef}) svf : ViewContainerRef;
  // compRef;
  // genCom;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.generateDynamicComp(
      this.formattedText,
      this.fireMessage,
      this.demoForm
    );

  }
  
  ngOnInit() {
    // console.log(this.demoForm)
    //This is Dynamic Rendering . . .
    // let secondComp = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    // this.compRef= this.svf.createComponent(secondComp);
    // //this.compRef.instance.formattedText = 'This is test <element> textInput name="firstInput" required="true" maxLength="4" minLength="2"</element>'
    // this.compRef.instance.value = 1;
    //  this.compRef.instance.throwVal.subscribe(response=>{alert(response)})
  }
  //This function generates a dynamic component using JIT . . .
  generateDynamicComp(
    value: string,
    emitter: EventEmitter<any>,
    compForm: FormGroup
  ) {
    const componentOnDemand = Component({
      template: value,
    })(
      class componentOnDemand implements OnInit {
        demoForm: FormGroup;
        controlsArray;

        constructor() {
          this.setupForm();
        }
        ngOnInit() {
          // emitter.emit("Fired from dynamic component " + value);
        }
        setupForm(): void {
          this.demoForm = new FormGroup({});
          for (let controlName in compForm.controls) {
            this.demoForm.addControl(controlName, new FormControl());
          }
          
        }
        
      }
      );
      const dynamicModule = NgModule({
        imports: [CommonModule, FormsModule, BrowserModule, ReactiveFormsModule],
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

  
  // validateForm(form: any): boolean {
    //   for (const name in form.controls) {
      //     if (form.controls[name] instanceof FormArray) {
        //       form.controls[name].controls.forEach((formGroup: FormGroup) => {
          //         this.validateForm(formGroup);
  //       });
  //       this.validateForm(form.controls[name]);
  //     } else if (form.controls[name] instanceof FormGroup) {
  //       this.validateForm(form.controls[name]);
  //     } else if (form.controls[name] && form.controls[name].enabled) {
    //       form.controls[name].updateValueAndValidity();
    //       form.controls[name].markAsTouched();
    //       form.controls[name].markAsDirty();
    //     }
    //   }
    //   console.log(form);
    //   return form.valid;
  // }
  
  //         onValueChanges(): void {
    // this.testForm.valueChanges.subscribe(val => {
      //          console.log(val)
      //           });
     
      // this.validateForm(this.testForm)
      //           if (this.testForm) {
        //             this.validateForm(this.testForm);
        //             this.onValueChanges();
        //}