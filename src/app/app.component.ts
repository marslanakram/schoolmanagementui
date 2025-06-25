import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schoolmanagementui';
   isLoading = false;

constructor(private translate: TranslateService,private loaderService: LoaderService) {
  {
    // Initialize the languages
    this.translate.addLangs(['en', 'ur']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang && browserLang.match(/en|ur/) ? browserLang : 'en');

    // Subscribe to loaderService's isLoading$ observable
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

}
}
