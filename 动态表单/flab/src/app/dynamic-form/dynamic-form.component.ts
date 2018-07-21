import {Component, Input, OnInit} from '@angular/core';
import {QuestionControlService} from '../question-control.service';
import {QuestionBase} from '../question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  /**
   * 问题列表
   */
  @Input()
  questions: QuestionBase<any>[] = [];

  /**
   * FormGroup
   */
  form: FormGroup;

  /**
   * 有效加载
   */
  payLoad = '';

  constructor(private qcs: QuestionControlService) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
