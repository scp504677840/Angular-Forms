import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TemplateComponent} from './template/template.component';
import {ForbiddenValidatorDirective} from './forbidden-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ForbiddenValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
