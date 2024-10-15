import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isModeratorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  let data = localStorage.getItem('data');
  const user = JSON.parse(data!);
  console.log(user.role_id);
  
  if (user.role_id === 4  || user.role_id ===1) {
     return true;
  }else{
    router.navigateByUrl("unauthorized");
    return false;
  }

};
