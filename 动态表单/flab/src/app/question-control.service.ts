import {Injectable} from '@angular/core';
import {QuestionBase} from './question-base';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class QuestionControlService {

  constructor() {
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    // 定义一个Object
    const group: any = {};

    // 遍历问题列表
    questions.forEach(question => {
      // 1.如果该问题是必填的，就执行new FormControl(question.value || '', Validators.required)
      // 否则执行new FormControl(question.value || '')
      // 两者之间相差一个验证器Validators.required
      // 2.group对象的属性是以question.key作为名称的。
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });

    return new FormGroup(group);
  }
}
