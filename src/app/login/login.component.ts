import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
}

  ngOnInit(): void {
  }

  onSubmit(){
    const { username, password } = this.loginForm.value;
    this.authenticationService.login(username, password)
      // .subscribe(() => {
      //   //this.router.navigate(['/']);

      //    // get return url from route parameters or default to '/'
      //    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      //    this.router.navigate([returnUrl]);
      // })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
      },
        error: (error) => {
          this.error = error;
        }
      });
    console.log(this.loginForm.value)
  }
}
