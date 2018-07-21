import {Component, Input} from '@angular/core';
import {QuestionBase} from '../question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {

  @Input()
  question: QuestionBase<any>;

  @Input()
  form: FormGroup;

  get isValid() {
    // 前面form中创建formControl时，就是用的question.key作为名称，所以这里就可以拿question.key找到指定的formControl。
    return this.form.controls[this.question.key].valid;
  }
}
