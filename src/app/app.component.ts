import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const currentLang = localStorage.getItem('lang');
    if (currentLang) {
      this.translate.use(currentLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    }

    this.translate.onLangChange.subscribe(event => {
      localStorage.setItem('lang', event.lang);
    });
  }
}
