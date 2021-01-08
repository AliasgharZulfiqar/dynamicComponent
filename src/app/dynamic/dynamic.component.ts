
import { Component, OnInit,ViewContainerRef,ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
@Input() value : number;
@Output() throwVal : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log("Response")
   console.log(this.value+ " This has come from the input")

  }
  ngAfterViewInit(){
  document.getElementById("modalBtn").click();    
  }
called(){
  this.throwVal.emit('Data coming from dynamic component')
}
}
