import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedComponent } from './shared/shared.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppComponent, SharedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'multimedia';
  constructor(private translate: TranslateService) {
    // Idioma por defecto
    this.translate.setDefaultLang('es');

    // Detectar el idioma del navegador (opcional)
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es/) ? browserLang : 'es');
  }

}
