import {Component} from '@angular/core';

/**
 * 表单验证
 * 通过验证用户输入的准确性和完整性，来增强整体数据质量。
 * 本文展示了如何在界面中如何验证用户输入，并显示有用的验证信息，先使用模板驱动表单方式，再使用响应式表单方式。
 *
 * 模板驱动验证
 * 为了往模板驱动表单中添加验证机制，你要添加一些验证属性，就像原生的 HTML 表单验证器。
 * Angular 会用指令来匹配这些具有验证功能的指令。
 *
 * 每当表单控件中的值发生变化时，Angular 就会进行验证，
 * 并生成一个验证错误的列表（对应着 INVALID 状态）或者 null（对应着 VALID 状态）。
 *
 * 你可以通过把 ngModel 导出成局部模板变量来查看该控件的状态。
 * 比如下面这个例子就把 NgModel 导出成了一个名叫 name 的变量。
 *
 * 响应式表单的验证
 * 在响应式表单中，真正的源码都在组件类中。
 * 不应该通过模板上的属性来添加验证器，
 * 而应该在组件类中直接把验证器函数添加到表单控件模型上（FormControl）。
 * 然后，一旦控件发生了变化，Angular 就会调用这些函数。
 *
 * 验证器函数
 * 有两种验证器函数：同步验证器和异步验证器。
 *
 * 同步验证器函数接受一个控件实例，然后返回一组验证错误或 null。
 * 你可以在实例化一个 FormControl 时把它作为构造函数的第二个参数传进去。
 *
 * 异步验证器函数接受一个控件实例，并返回一个承诺（Promise）或可观察对象（Observable），
 * 它们稍后会发出一组验证错误或者 null。
 * 你可以在实例化一个 FormControl 时把它作为构造函数的第三个参数传进去。
 *
 * 注意：出于性能方面的考虑，只有在所有同步验证器都通过之后，Angular 才会运行异步验证器。
 * 当每一个异步验证器都执行完之后，才会设置这些验证错误。
 *
 * 内置验证器
 * 你可以写自己的验证器，也可以使用一些 Angular 内置的验证器。
 *
 * 模板驱动表单中可用的那些属性型验证器（如 required、minlength 等）对应于 Validators 类中的同名函数。
 * 要想查看内置验证器的全列表，参见 API 参考手册中的验证器部分。
 * https://www.angular.cn/api/forms/Validators
 *
 * 要想把这个英雄表单改造成一个响应式表单，你还是用那些内置验证器，但这次改为用它们的函数形态。
 *
 * 表示控件状态的 CSS 类
 * 像 AngularJS 中一样，Angular 会自动把很多控件属性作为 CSS 类映射到控件所在的元素上。
 * 你可以使用这些类来根据表单状态给表单控件元素添加样式。
 * 目前支持下列类：
 * .ng-valid
 * .ng-invalid
 * .ng-pending
 * .ng-pristine
 * .ng-dirty
 * .ng-untouched
 * .ng-touched
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
