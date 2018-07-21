import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  /**
   * 这里创建了一个名叫 name 的 FormControl。 它将会绑定到模板中的一个 <input> 元素，表示英雄的名字。
   * FormControl 构造函数接收三个可选参数： 初始值、验证器数组和异步验证器数组。
   * 最简单的控件并不需要数据或验证器，但是在实际应用中，大部分表单控件都会同时具备它们。
   *
   * 要让 Angular 知道你希望把这个输入框关联到类中的 FormControl 型属性 name，
   * 就要在模板中的 <input> 上加一句 [formControl]="name"。
   */
  name = new FormControl();

  constructor() {
  }

  ngOnInit() {
  }

}
