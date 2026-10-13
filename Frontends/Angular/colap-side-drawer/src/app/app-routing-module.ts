import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard-page')
          .then(m => m.DashboardPage) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
