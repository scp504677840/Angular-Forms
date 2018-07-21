import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  heroFrom: FormGroup;

  states = ['CA', 'MD', 'OH', 'VA'];

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
   *
   * Validators.required
   * 虽然本章不会深入讲解验证机制，但还是有一个例子来示范如何简单的在响应式表单中使用 Validators.required。
   * 要想让 name 这个 FormControl 是必须的，
   * 请把 FormGroup 中的 name 属性改为一个数组。
   * 第一个条目是 name 的初始值，
   * 第二个是 required 验证器：Validators.required。
   *
   * 响应式验证器是一些简单、可组合的函数。
   * 在模板驱动表单中配置验证器有些困难，因为你必须把验证器包装进指令中。
   *
   * Validators.required 生效了，但状态还是 INVALID，因为输入框中还没有值。
   * 在输入框中输入，就会看到这个状态从 INVALID 变成了 VALID。
   *
   * 修改过的模板包含更多文本输入框，一个 state 选择框，power（超能力）的单选按钮和一个 sidekick 检查框。
   * 你要用 [value]="state" 来绑定 <option> 的 value 属性。
   * 如果不绑定这个值，这个选择框就会显示来自数据模型中的第一个选项。
   *
   * 组件类定义了控件属性而不用管它们在模板中的表现形式。
   * 你可以像定义 name 控件一样定义 state、power 和 sidekick 控件，
   * 并用 formControlName 指令来指定 FormControl 的名字。
   *
   * 多级 FormGroup
   * 要想更有效的管理这个表单的大小，
   * 你可以把一些相关的 FormControl 组织到多级 FormGroup 中。
   * 比如，street、city、state 和 zip 就可以作为一个名叫 address 的 FormGroup 中的理想属性。
   * 用这种方式，多级表单组和控件可以让你轻松地映射多层结构的数据模型，以帮你跟踪这组相关控件的有效性和状态。
   *
   * 你用 FormBuilder 在这个名叫 heroForm 的组件中创建一个 FormGroup，并把它用作父 FormGroup。
   * 再次使用 FormBuilder 创建一个子级 FormGroup，
   * 其中包括这些住址控件。把结果赋值给父 FormGroup 中新的 address 属性。
   *
   * 查看 FormControl 的属性
   * 你可以使用 .get() 方法来提取表单中一个单独 FormControl 的状态。
   * 你可以在组件类中这么做，或者通过往模板中添加下列代码来把它显示在页面中，
   * 就添加在 {{form.value | json}} 插值表达式的紧后面：
   * <p>Name value: {{ heroForm.get('name').value }}</p>
   * 要点取得 FormGroup 中的 FormControl 的状态，使用点语法来指定到控件的路径。
   * <p>Street value: {{ heroForm.get('address.street').value}}</p>
   *
   * 你可以使用此技术来显示 FromControl 的任意属性，代码如下：
   * myControl.value
   * FormControl 的值。
   *
   * myControl.status
   * FormControl 的有效性。可能的值有 VALID、INVALID、PENDING 或 DISABLED。
   *
   * myControl.pristine
   * 如果用户尚未改变过这个控件的值，则为 true。它总是与 myControl.dirty 相反。
   *
   * myControl.untouched
   * 如果用户尚未进入这个 HTML 控件，也没有触发过它的 blur（失去焦点）事件，则为 true。 它是 myControl.touched 的反义词。
   */
  private createForm() {
    this.heroFrom = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        street: '',
        city: '',
        state: '',
        zip: '',
      }),
      power: '',
      sidekick: ''
    });
  }
}
