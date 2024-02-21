import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class userGuard implements CanActivate {

  constructor(private router: Router, private dataservice: DataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.dataservice.checkDetails().pipe(
      map(res => {
        if (res.error) {
          this.router.navigate(['login']);
          return false;
        } else if(!res.decodedToken.details.isAdmin) {
          return true;
        } else if(res.decodedToken.details.isAdmin) {
          return true;
        }  else {
          return false
        }
      })
    );
  }
}
