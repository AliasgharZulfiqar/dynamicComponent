import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genComp :boolean = true;
  title = 'dynamicComp';
  formattedText : string = '';
  dynamicForm : FormGroup;
  constructor(private fb : FormBuilder){
  this.dynamicForm = this.fb.group({
    formattedText : ['',[Validators.required]]
  })
  }
  formSubmission(data){
    console.log(data);
  }
  genComponent(){
    this.genComp = true;
  }
  removeComponent(){
    this.genComp = false;
  }
  getFormData(){
    this.formattedText = this.dynamicForm.value.formattedText;
  }
  insertButton(){
    this.formattedText += '<button class="btn btn-danger">Added Dynamically</button>'
  }
  getMessage(data){
    alert(data)
  }
}
