export class Hero {
  /**
   * 英雄
   *
   * @param id id
   * @param name 姓名
   * @param power 能力
   * @param alterEgo 第二人格
   */
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {
  }
}
