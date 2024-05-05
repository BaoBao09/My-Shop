import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formLogin: any;
  public loading: boolean = false;
  returnUrl: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  CheckLogin(obj) {
    if (this.formLogin.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.returnUrl);
    
    this.authenticationService
      .login(obj.username, obj.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
