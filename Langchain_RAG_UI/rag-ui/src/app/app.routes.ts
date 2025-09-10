import { Routes } from '@angular/router';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { DocumentsPageComponent } from './pages/documents-page/documents-page.component';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'conversation' },
  { path: 'conversation/:sessionId', component: ConversationPageComponent },
  { path: 'conversation', component: ConversationPageComponent },
  { path: 'documents', component: DocumentsPageComponent },
  { path: '**', redirectTo: 'conversation' }
];
