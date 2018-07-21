import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  heroFrom: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  /**
   * FormBuilder.group 是一个用来创建 FormGroup 的工厂方法，
   * 它接受一个对象，对象的键和值分别是 FormControl 的名字和它的定义。
   * 在这个例子中，name 控件的初始值是空字符串。
   *
   * 把一组控件定义在一个单一对象中，可以让你的代码更加紧凑、易读。
   * 因为你不必写一系列重复的 new FormControl(...) 语句。
   */
  private createForm() {
    this.heroFrom = this.fb.group({
      name: ''
    });
  }
}
