import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  let data = localStorage.getItem('data');
  const user = JSON.parse(data!);

  if (user.role_id != 1) {
    router.navigateByUrl("unauthorized");
    return false;
  }else{
    return true;
  }

};
