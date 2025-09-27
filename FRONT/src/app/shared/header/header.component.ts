import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TopHeaderComponent } from './partials/top-header/top-header.component';
import { MobileBottomComponent } from './partials/mobile-bottom/mobile-bottom.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf, TranslateModule, TopHeaderComponent, MobileBottomComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: any = null;
  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);

  }



}
