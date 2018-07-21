import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {HeroService} from '../hero.service';

/**
 * HeroListComponent 使用一个注入进来的 HeroService 来从服务器获取英雄列表，
 * 然后用一系列按钮把这些英雄展示给用户。
 * HeroService 模拟了 HTTP 服务。
 * 它返回一个英雄组成的 Observable 对象，并会在短暂的延迟之后被解析出来，
 * 这是为了模拟网络延迟，并展示应用在自然延迟下的异步效果。
 *
 * 当用户点击一个英雄时，组件设置它的 selectedHero 属性，
 * 它绑定到 HeroDetailComponent 的 @Input() 属性 hero 上。
 * HeroDetailComponent 检测到英雄的变化，并使用当前英雄的值重置此表单。
 *
 * "刷新"按钮会清除英雄列表和当前选中的英雄，然后重新获取英雄列表。
 *
 * 注意，hero-list.component.ts 从 rxjs 中导入了 Observable 和 finalize，
 * 而 hero.service.ts 导入了 Observable、of 和 delay 操作符。
 */
@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Observable<Hero[]>;
  isLoading = false;
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.isLoading = true;
    this.heroes = this.heroService.getHeroes()
    // TODO: error handling
      .pipe(finalize(() => this.isLoading = false));
    this.selectedHero = undefined;
  }

  select(hero: Hero) { this.selectedHero = hero; }
}
