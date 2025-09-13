import { Routes } from '@angular/router';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { DocumentsPageComponent } from './pages/documents-page/documents-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { authGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const APP_ROUTES: Routes = [
  // Public routes
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Protected routes
  {
    path: '',
    component: PrivateLayoutComponent,
    canMatch: [authGuard],
    children: [
      { path: 'conversation/:sessionId', component: ConversationPageComponent },
      { path: 'conversation', component: ConversationPageComponent },
      { path: 'documents', component: DocumentsPageComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
