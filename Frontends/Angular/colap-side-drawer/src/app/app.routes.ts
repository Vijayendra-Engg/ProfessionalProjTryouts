import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign-in required | Northstar',
    loadComponent: () =>
      import('./features/auth-required/auth-required-page').then(
        (module) => module.AuthRequiredPage,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-shell/app-shell').then(
        (module) => module.AppShell,
      ),
    canActivateChild: [authenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        title: 'Overview | Northstar',
        loadComponent: () =>
          import('./features/dashboards/overview-dashboard/overview-dashboard').then(
            (module) => module.OverviewDashboard,
          ),
      },
      {
        path: 'dashboard/sales',
        title: 'Sales performance | Northstar',
        loadComponent: () =>
          import('./features/dashboards/sales-dashboard/sales-dashboard').then(
            (module) => module.SalesDashboard,
          ),
      },
      {
        path: 'dashboard/operations',
        title: 'Operations | Northstar',
        loadComponent: () =>
          import('./features/dashboards/operations-dashboard/operations-dashboard').then(
            (module) => module.OperationsDashboard,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
