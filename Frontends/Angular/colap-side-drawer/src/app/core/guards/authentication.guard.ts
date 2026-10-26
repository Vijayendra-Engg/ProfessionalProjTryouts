import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import {
  AUTHENTICATED,
  DEMO_AUTHENTICATION_BYPASS,
} from '../services/authentication.service';

export const authenticationGuard: CanActivateChildFn = (_route, state) => {
  const allowDemoAccess = inject(DEMO_AUTHENTICATION_BYPASS);
  const isAuthenticated = inject(AUTHENTICATED);
  const router = inject(Router);

  return allowDemoAccess || isAuthenticated()
    ? true
    : router.createUrlTree(['/sign-in'], {
        queryParams: { returnUrl: state.url },
      });
};
