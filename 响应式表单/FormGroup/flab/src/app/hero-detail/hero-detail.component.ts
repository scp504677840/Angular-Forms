import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  /**
   * 注意，现在单行输入框位于一个 form 元素中。
   *
   * formGroup 是一个响应式表单的指令，它拿到一个现有 FormGroup 实例，并把它关联到一个 HTML 元素上。
   * 这种情况下，它关联到的是 <form> 元素上的 FormGroup 实例 heroForm。
   *
   * 由于现在有了一个 FormGroup，
   * 因此你必须修改模板语法来把这个 <input> 关联到组件类中对应的 FormControl 上。
   * 以前没有父 FormGroup 的时候，[formControl]="name" 也能正常工作，
   * 因为该指令可以独立工作，也就是说，不在 FormGroup 中时它也能用。
   * 有了 FormGroup，name 这个 <input> 就需要再添加一个语法 formControlName=name，
   * 以便让它关联到类中正确的 FormControl 上。
   * 这个语法告诉 Angular，查阅父 FormGroup（这里是 heroForm），
   * 然后在这个 FormGroup 中查阅一个名叫 name 的 FormControl。
   */
  heroForm = new FormGroup({
    name: new FormControl()
  });

  constructor() {
  }

  ngOnInit() {
  }

}
