import {Component} from '@angular/core';
import {QuestionService} from './question.service';

/**
 * 动态表单
 * 有时候手动编写和维护表单所需工作量和时间会过大。
 * 特别是在需要编写大量表单时。
 * 表单都很相似，而且随着业务和监管需求的迅速变化，表单也要随之变化，这样维护的成本过高。
 *
 * 基于业务对象模型的元数据，动态创建表单可能会更划算。
 *
 * 本文会展示如何利用 formGroup 来动态渲染一个简单的表单，包括各种控件类型和验证规则。
 * 这个起点很简陋，但可以在这个基础上添加丰富多彩的问卷问题、更优美的渲染以及更卓越的用户体验。
 *
 * 这个例子要为正在找工作的英雄们创建一个在线申请表的动态表单。
 * 英雄管理局会不断修改申请流程，你要在不修改应用代码的情况下，动态创建这些表单。
 *
 * 分析：
 * 1.QuestionService获取问题列表
 * 2.QuestionBase表单数据模型[基类]
 * 3.DynamicFormComponent
 *  3.1将数据模型转为表单模型
 *  this.form = this.qcs.toFormGroup(this.questions);
 * 4.QuestionControlService将数据模型转为表单模型
 * 5.遍历问题列表
 * <div *ngFor="let question of questions"
 * 6.DynamicFormQuestionComponent
 *  6.1持有questions和form
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [QuestionService]
})
export class AppComponent {
  questions: any[];

  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
  }
}
