import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ChatComponentssComponent } from './chat-componentss/chat-componentss.component';
import { ChatBotRechercheComponent } from './chat-bot-recherche/chat-bot-recherche.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatComponentssComponent,
    ChatBotRechercheComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
