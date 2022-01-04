import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AccountService} from "@app/_services";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const account = this.accountService.tokenValue;
    if (account) {
      return true ;
    }
    else {
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
