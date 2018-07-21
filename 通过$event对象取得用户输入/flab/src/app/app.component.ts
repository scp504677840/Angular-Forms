import {Component} from '@angular/core';

/**
 * 用户输入
 * 当用户点击链接、按下按钮或者输入文字时，这些用户动作都会产生 DOM 事件。
 * 本章解释如何使用 Angular 事件绑定语法把这些事件绑定到事件处理器。
 *
 * 绑定到用户输入事件
 * 你可以使用 Angular 事件绑定机制来响应任何 DOM 事件。
 * 许多 DOM 事件是由用户输入触发的。绑定这些事件可以获取用户输入。
 *
 * 要绑定 DOM 事件，只要把 DOM 事件的名字包裹在圆括号中，然后用放在引号中的模板语句对它赋值就可以了。
 * 下例展示了一个事件绑定，它实现了一个点击事件处理器：
 * <button (click)="onClickMe()">Click me!</button>
 * 等号左边的 (click) 表示把按钮的点击事件作为绑定目标。
 * 等号右边引号中的文本是模板语句，通过调用组件的 onClickMe 方法来响应这个点击事件。
 *
 * 写绑定时，需要知道模板语句的执行上下文。
 * 出现在模板语句中的每个标识符都属于特定的上下文对象。
 * 这个对象通常都是控制此模板的 Angular 组件。
 * 上例中只显示了一行 HTML，那段 HTML 片段属于下面这个组件。
 *
 * 当用户点击按钮时，Angular 调用 ClickMeComponent 的 onClickMe 方法。
 *
 * 通过 $event 对象取得用户输入
 * DOM 事件可以携带可能对组件有用的信息。
 * 本节将展示如何绑定输入框的 keyup 事件，在每个敲击键盘时获取用户输入。
 * 下面的代码监听 keyup 事件，并将整个事件载荷 ($event) 传递给组件的事件处理器。
 *
 * $event 对象的属性取决于 DOM 事件的类型。例如，鼠标事件与输入框编辑事件包含了不同的信息。
 *
 * 所有标准 DOM 事件对象都有一个 target 属性， 引用触发该事件的元素。
 * 在本例中，target 是<input> 元素， event.target.value 返回该元素的当前内容。
 *
 * 在组件的 onKey() 方法中，把输入框的值和分隔符 (|) 追加组件的 values 属性。
 * 使用插值表达式来把存放累加结果的 values 属性回显到屏幕上。
 *
 * 假设用户输入字母“abc”，然后用退格键一个一个删除它们。 用户界面将显示：
 * a | ab | abc | ab | a | |
 * 或者，你可以用 event.key 替代 event.target.value，积累各个按键本身，这样同样的用户输入可以产生：
 * a | b | c | backspace | backspace | backspace |
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clickMessage = '';

  values = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }

  onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }
}
