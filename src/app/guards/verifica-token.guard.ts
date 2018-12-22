import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  canActivate(): Promise<boolean> | boolean {
    console.log('Token Guard');
    return true;
  }
}
