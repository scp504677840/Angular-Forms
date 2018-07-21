import {QuestionBase} from './question-base';

/**
 * TextboxQuestion 可以通过 type 属性来支持多种 HTML5 元素类型，比如文本、邮件、网址等。
 */
export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
