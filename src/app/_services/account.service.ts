import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '@app/_models';
import {LoginResult} from '@app/_dto/loginresult.dto';
import {environment} from '../../environments/environment';

const baseUrl = environment.apiUrl + `/api`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  private userToken: BehaviorSubject<string>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(null!);
    this.user = this.userSubject.asObservable();
    this.userToken = new BehaviorSubject<string>('');
  }

  public get accountValue(): User {
    return this.userSubject.value;
  }

  public get tokenValue(): string {
    return this.userToken.value;
  }

  login(email: string, password: string) {
    return this.http.post<LoginResult>(`${baseUrl}/auth/login`, { email, password }, { withCredentials: true })
      .pipe(map((loginResult) => {
        localStorage.setItem('accessToken', loginResult.accessToken);
        this.userToken.next(loginResult.accessToken);
        this.userSubject.next(loginResult.user);
        return loginResult.user;
      }));
  }

  checkLogin() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.http.get<User>(`${baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .subscribe((authenticate) => {
          this.userSubject.next(authenticate);
          this.userToken.next(token);
        }, (error) => {
          this.router.navigate(['/account/login']);
        });
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.userSubject.next(null!);
    this.router.navigate(['/account/login']);
  }

  register(name: string, password: string, email: string, registerCallback: (isFailed: any) => boolean) {
    this.http.post<any>(`${baseUrl}/Auth`, {name, password, email}, ).subscribe(
      res => {
        registerCallback(false);
      }, error => {
        registerCallback(true);
      });
  }
}
