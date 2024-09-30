import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotRechercheComponent } from './chat-bot-recherche.component';

describe('ChatBotRechercheComponent', () => {
  let component: ChatBotRechercheComponent;
  let fixture: ComponentFixture<ChatBotRechercheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatBotRechercheComponent]
    });
    fixture = TestBed.createComponent(ChatBotRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
