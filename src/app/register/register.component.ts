import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.registerForm = this.formBuilder.group({
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
    // En Javascript avant : 
    // const username = this.registerForm.value.username
    // const password = this.registerForm.value.password
    const { username, password } = this.registerForm.value;
    this.authenticationService.register(username, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
      },
        error: (error) => {
          this.error = error;
          console.log(this.registerForm.value)
        }
      });
  }
}