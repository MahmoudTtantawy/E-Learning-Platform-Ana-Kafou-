import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const Token = localStorage.getItem('Token');
  if (Token != null) {
    return true;
  } else {
    router.navigateByUrl("signin");
    return false;
  }
};
