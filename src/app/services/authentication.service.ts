import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Role } from '../model/role';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    const a = JSON.parse(localStorage.getItem('staff')!);
    
    if (a != null) {
      this.userSubject = new BehaviorSubject<User>(a.data);
      this.user = this.userSubject.asObservable();
    }
    else{
      this.userSubject = new BehaviorSubject<User>(a);
      this.user = this.userSubject.asObservable();
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`https://localhost:7064/api/NhanVien/Authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('staff', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('staff');
    this.userSubject.next(new User());
    this.router.navigate(['/admin/login']);
  }

  remove() {
    // remove user from local storage to log user out
    localStorage.removeItem('staff');
    this.userSubject.next(new User());
  }
}
