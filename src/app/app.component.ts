import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userId: string = '';
  shouldShowButton: boolean = true;

  constructor(private router: Router) {}

ngOnInit() {
    this.router.events.pipe(
      filter((event: NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Masquer le bouton si la route actuelle est celle de chat
      this.shouldShowButton = !event.urlAfterRedirects.includes('/chat');
    });
  }

  goToChat() {
    // Naviguer vers la page de chat avec l'ID de l'utilisateur saisi
    this.router.navigate(['/chat', this.userId]);
  }
}
