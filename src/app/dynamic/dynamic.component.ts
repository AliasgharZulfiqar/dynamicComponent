
import { Component, OnInit,ViewContainerRef,ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
@Input() value : number;
@Input() formattedText:string;
@Output() throwVal : EventEmitter<any> = new EventEmitter();
dynamicStep : FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
   console.log(this.value+ " This has come from the input");
   console.log(this.formattedText)
  let test = this.formattedText.split("<element>")
   console.log(test[1].replace("</element>",""));
  //  this.dynamicStep = this.fb.group({

  //  })
  }
  ngAfterViewInit(){
  document.getElementById("modalBtn").click();    
  }
called(){
  this.throwVal.emit('Data coming from dynamic component')
}
}
