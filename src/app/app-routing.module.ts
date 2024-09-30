import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ChatComponentssComponent } from './chat-componentss/chat-componentss.component';
import {ChatBotRechercheComponent} from './chat-bot-recherche/chat-bot-recherche.component'
const routes: Routes = [
  {path: 'chat/:userId/:roomDesc', component: ChatComponent},
  { path: 'chats/:username', component: ChatComponentssComponent },
  { path: 'messages/:roomDesc', component: ChatComponentssComponent },
  { path: 'chatBot', component: ChatBotRechercheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
