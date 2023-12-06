import { forwardRef, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(forwardRef(() => AuthService));
    const router = inject(forwardRef(() => Router));

    if (authService.checkConnexion()) {
        return true;
    } else {
        router.navigate(['/login'])
        return false;
    }


};
