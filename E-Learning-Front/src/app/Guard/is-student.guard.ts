import { CanActivateFn } from '@angular/router';

export const isStudentGuard: CanActivateFn = (route, state) => {
  return true;
};
