import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../address';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

/**
 * 数据模型与表单模型
 * 此刻，表单显示的是空值。 HeroDetailComponent 应该显示一个英雄的值，这个值可能接收自远端服务器。
 * 在这个应用中，HeroDetailComponent 从它的父组件 HeroListComponent 中取得一个英雄。
 * 来自服务器的 hero 就是数据模型，而 FormControl 的结构就是表单模型。
 * 组件必须把数据模型中的英雄值复制到表单模型中。这里隐含着两个非常重要的点。
 * 1.开发人员必须理解数据模型是如何映射到表单模型中的属性的。
 * 2.用户修改时的数据流是从 DOM 元素流向表单模型的，而不是数据模型。
 *
 * 表单控件永远不会修改数据模型。
 * 表单模型和数据模型的结构并不需要精确匹配。
 * 在一个特定的屏幕上，你通常只会展现数据模型的一个子集。
 * 但是表单模型的形态越接近数据模型，事情就会越简单。
 * 在 HeroDetailComponent 中，这两个模型是非常接近的。
 *
 * 使用 setValue() 和 patchValue() 来操纵表单模型
 * 以前，你创建了控件，并同时初始化它的值。
 * 你也可以稍后用 setValue() 和 patchValue() 来初始化或重置这些值。
 *
 * setValue()
 * 借助setValue()，你可以设置每个表单控件的值，只要把与表单模型的属性精确匹配的数据模型传进去就可以了。
 * this.heroForm.setValue({
 *    name:    this.hero.name,
 *    address: this.hero.addresses[0] || new Address()
 * });
 * setValue() 方法会在赋值给任何表单控件之前先检查数据对象的值。
 * 它不会接受一个与 FormGroup 结构不同或缺少表单组中任何一个控件的数据对象。
 * 这种方式下，如果你有什么拼写错误或控件嵌套的不正确，它就能返回一些有用的错误信息。
 * 反之，patchValue() 会默默地失败。
 *
 * 注意，你几乎可以直接把这个 hero 用作 setValue() 的参数，因为它的形态与组件的 FormGroup 结构是非常像的。
 * 你现在只能显示英雄的第一个住址，不过你还必须考虑 hero 完全没有住址的可能性。
 * 就像这个在数据对象参数中对 address 属性进行有条件的设置：
 * address: this.hero.addresses[0] || new Address()
 *
 * patchValue()
 * 借助patchValue()，你可以通过提供一个只包含要更新的控件的键值对象来把值赋给 FormGroup 中的指定控件。
 * 这个例子只会设置表单的 name 控件。
 * this.heroForm.patchValue({
 *    name: this.hero.name
 * });
 * 借助patchValue()，你可以更灵活地解决数据模型和表单模型之间的差异。
 * 但是和 setValue() 不同，patchValue() 不会检查缺失的控件值，并且不会抛出有用的错误信息。
 *
 * 使用 FormArray 来表示 FormGroup 数组
 * FormGroup 是一个命名对象，它的属性值是 FormControl 和其它的 FormGroup。
 * 有时你需要表示任意数量的控件或控件组。 比如，一个英雄可能拥有 0、1 或任意数量的住址。
 * Hero.addresses 属性就是一个 Address 实例的数组。
 * 一个 address 的 FormGroup 可以显示一个 Address 对象。
 * 而 FormArray 可以显示一个 address FormGroup 的数组。
 *
 * 监视控件的变化
 * 每当用户在父组件 HeroListComponent 中选取了一个英雄，Angular 就会调用一次 ngOnChanges。
 * 选取英雄会修改输入属性 HeroDetailComponent.hero()。
 *
 * 当用户修改英雄的名字或秘密小屋时，Angular并不会调用 ngOnChanges()。
 * 幸运的是，你可以通过订阅表单控件的属性之一来了解这些变化，此属性会发出变更通知。
 *
 * 有一些属性，比如 valueChanges，
 * 可以返回一个 RxJS 的 Observable 对象。
 * 要监听控件值的变化，你并不需要对 RxJS 的 Observable 了解更多。
 *
 * 添加下列方法，以监听 name 这个 FormControl 中值的变化。
 * nameChangeLog: string[] = [];
 * logNameChange() {
 *    const nameControl = this.heroForm.get('name');
 *    nameControl.valueChanges.forEach(
 *        (value: string) => this.nameChangeLog.push(value)
 *    );
 * }
 *
 * 什么时候用它
 * 插值表达式绑定时显示姓名变化比较简单的方式。
 * 在组件类中订阅表单控件属性变化的可观察对象以触发应用逻辑则是比较难的方式。
 *
 * 保存表单数据
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnChanges {

  @Input()
  hero: Hero;

  heroFrom: FormGroup;

  states = ['CA', 'MD', 'OH', 'VA'];

  nameChangeLog: string[] = [];

  constructor(private fb: FormBuilder, private heroService: HeroService) {
    this.createForm();
    this.logNameChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildForm();
  }

  /**
   * 查看 FormControl 的属性
   * 你可以使用 .get() 方法来提取表单中一个单独 FormControl 的状态。
   * 你可以在组件类中这么做，或者通过往模板中添加下列代码来把它显示在页面中，
   * 就添加在 {{form.value | json}} 插值表达式的紧后面：
   * <p>Name value: {{ heroForm.get('name').value }}</p>
   * 要点取得 FormGroup 中的 FormControl 的状态，使用点语法来指定到控件的路径。
   * <p>Street value: {{ heroForm.get('address.street').value}}</p>
   *
   * 你可以使用此技术来显示 FromControl 的任意属性，代码如下：
   * myControl.value
   * FormControl 的值。
   *
   * myControl.status
   * FormControl 的有效性。可能的值有 VALID、INVALID、PENDING 或 DISABLED。
   *
   * myControl.pristine
   * 如果用户尚未改变过这个控件的值，则为 true。它总是与 myControl.dirty 相反。
   *
   * myControl.untouched
   * 如果用户尚未进入这个 HTML 控件，也没有触发过它的 blur（失去焦点）事件，则为 true。 它是 myControl.touched 的反义词。
   */
  private createForm() {
    this.heroFrom = this.fb.group({
      name: ['', Validators.required],
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  rebuildForm() {
    this.heroFrom.reset({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address()
    });
    this.setAddresses(this.hero.addresses);
  }

  /**
   * 下面的 setAddresses() 方法把 secretLairs 这个 FormArray 替换为一个新的 FormArray，
   * 使用一组表示英雄地址的 FormGroup 来进行初始化。
   * 在 HeroDetailComponent 类中添加下列内容：
   *
   * 注意，你使用 FormGroup.setControl() 方法，
   * 而不是 setValue() 方法来替换前一个 FormArray。
   * 你所要替换的是控件，而不是控件的值。
   *
   * 还要注意，secretLairs 数组中包含的是**FormGroup，而不是 Address。
   *
   * 接着，在 rebuildForm() 中调用 setAddresses()。
   *
   * @param addresses
   */
  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroFrom.setControl('secretLairs', addressFormArray);
  }

  /**
   * 获取 FormArray
   * HeroDetailComponent 应该能从 secretLairs FormArray 中显示、添加和删除条目。
   * 使用 FormGroup.get() 方法来获取到 FormArray 的引用。
   * 把这个表达式包装进一个名叫 secretLairs 的便捷属性中来让它更清晰，并供复用。
   * 在 HeroDetailComponent 中添加下列内容。
   */
  get secretLairs(): FormArray {
    return this.heroFrom.get('secretLairs') as FormArray;
  }

  /**
   * 添加一个 addLair() 方法，它获取 secretLairs 数组，并把新的表示地址的 FormGroup 添加到其中。
   */
  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }

  /**
   * 删除一个地址
   */
  removeLair() {
    this.secretLairs.removeAt(0);
  }

  logNameChange() {
    const nameControl = this.heroFrom.get('name');
    nameControl.valueChanges.forEach((value: string) => {
      this.nameChangeLog.push(value);
    });
  }

  /**
   * 当用户提交表单时，HeroDetailComponent 会把英雄实例的数据模型传给所注入进来的 HeroService 的一个方法来进行保存。
   * 在 HeroDetailComponent 中添加如下内容：
   */
  onSubmit() {
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    this.rebuildForm();
  }

  /**
   * 原始的 hero 中有一些保存之前的值，用户的修改仍然是在表单模型中。
   * 所以你要根据原始英雄（根据 hero.id 找到它）的值组合出一个新的 hero 对象，
   * 并用 prepareSaveHero() 助手来深层复制变化后的模型值。
   *
   * 地址的深层复制
   * 你已经把 formModel.secretLairs 赋值给了 saveHero.addresses（参见注释掉的部分），
   * saveHero.addresses 数组中的地址和 formModel.secretLairs 中的会是同一个对象。
   * 用户随后对小屋所在街道的修改将会改变 saveHero 中的街道地址。
   *
   * 但 prepareSaveHero 方法会制作表单模型中的 secretLairs 对象的复本，因此实际上并没有修改原有对象。
   */
  prepareSaveHero(): Hero {
    const formModel = this.heroFrom.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      // addresses: formModel.secretLairs // <-- bad!
      addresses: secretLairsDeepCopy
    };
    return saveHero;
  }

  revert() {
    this.rebuildForm();
  }
}
