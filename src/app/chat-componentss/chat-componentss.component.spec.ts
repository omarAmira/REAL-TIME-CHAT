import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponentssComponent } from './chat-componentss.component';

describe('ChatComponentssComponent', () => {
  let component: ChatComponentssComponent;
  let fixture: ComponentFixture<ChatComponentssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponentssComponent]
    });
    fixture = TestBed.createComponent(ChatComponentssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
