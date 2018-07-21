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
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
