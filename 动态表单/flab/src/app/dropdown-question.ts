import {QuestionBase} from './question-base';

/**
 * DropdownQuestion 表示一个带可选项列表的选择框。
 */
export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
