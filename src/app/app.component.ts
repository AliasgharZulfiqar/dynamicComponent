import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  genComp: boolean = true;
  title = "dynamicComp";
  formattedText: string = "";
  dynamicForm: FormGroup;
  formObj: FormGroup;
  testForm: FormGroup;
  test: FormControlName;

  compForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      formattedText: ["", [Validators.required]],
      // <form [formGroup]="testForm"><input type="text" formControlName="test"/><input type="number" maxLength=10 formControlName="test"/></form>
    });
  }
  formSubmission(data) {
    // console.log(data);
  }
  createForm() {
    if (this.dynamicForm.get("formattedText").value == null) {
      this.dynamicForm
        .get("formattedText")
        .setValue(
          '<form [formGroup]="demoForm"> <input type="text" formControlName="testInput"/> <input type="text" formControlName="secondTestInput"/> <input type="text" formControlName="thirdTestInput"/></form>'
        );
    } else {
      let value = this.dynamicForm.get("formattedText").value;
      value +='<form [formGroup]="demoForm"> <input type="text" formControlName="testInput"/> <input type="text" formControlName="secondTestInput"/> <input type="text" formControlName="thirdTestInput"/></form>';
      this.dynamicForm.get("formattedText").setValue(value);
    }
    let demoForm = new FormGroup({
      testInput: new FormControl(""),
      secondTestInput: new FormControl(""),
      thirdTestInput: new FormControl(""),
    });
    this.formObj = demoForm;
  }
  // genComponent(){
  //   this.genComp = true;
  // }
  // removeComponent(){
  //   this.genComp = false;
  // }
  getFormData() {
    this.formattedText = this.dynamicForm.value.formattedText;
    //  this.dynamicForm.addControl('testing',new FormControl(''))
    // console.log(this.dynamicForm)
    this.compForm = this.dynamicForm;
  }

  getMessage(data) {
    alert(data);
  }
  // updateElement(){
  //   this.dynamicForm.get('testing').setErrors({required:true});
  //   console.log(this.dynamicForm.get('testing'))
  // }
}
