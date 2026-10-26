import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  AUTHENTICATED,
  DEMO_AUTHENTICATION_BYPASS,
} from '../services/authentication.service';
import { authenticationGuard } from './authentication.guard';

describe('authenticationGuard', () => {
  let authenticated: boolean;

  beforeEach(() => {
    authenticated = false;
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AUTHENTICATED, useValue: () => authenticated },
        { provide: DEMO_AUTHENTICATION_BYPASS, useValue: false },
      ],
    });
  });

  it('redirects unauthenticated users to sign-in with the requested URL', () => {
    const result = TestBed.runInInjectionContext(() =>
      authenticationGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/dashboard/sales' } as RouterStateSnapshot,
      ),
    );

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toContain(
      'returnUrl=%2Fdashboard%2Fsales',
    );
  });

  it('allows authenticated users through', () => {
    authenticated = true;

    const result = TestBed.runInInjectionContext(() =>
      authenticationGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/dashboard' } as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
  });

  it('allows demo access when the development bypass is enabled', () => {
    TestBed.overrideProvider(DEMO_AUTHENTICATION_BYPASS, { useValue: true });

    const result = TestBed.runInInjectionContext(() =>
      authenticationGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/dashboard' } as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
  });
});
