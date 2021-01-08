import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genComp :boolean = true;
  title = 'dynamicComp';
  genComponent(){
    this.genComp = true;
  }
  removeComponent(){
    this.genComp = false;
  }
}
