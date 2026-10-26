import { InjectionToken, isDevMode, signal } from '@angular/core';

export const AUTHENTICATED = new InjectionToken<() => boolean>(
  'AUTHENTICATED',
  {
    providedIn: 'root',
    factory: () => {
      const authenticated = signal(false);
      return authenticated.asReadonly();
    },
  },
);

export const DEMO_AUTHENTICATION_BYPASS = new InjectionToken<boolean>(
  'DEMO_AUTHENTICATION_BYPASS',
  {
    providedIn: 'root',
    factory: () => isDevMode(),
  },
);
