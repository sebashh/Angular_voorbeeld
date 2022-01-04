import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '@app/_services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    public accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    if (!this.isFormValid()){
      return;
    }
    this.createUser();
  }
  private createUser() {
    const currentContext = this;
    this.accountService.register(this.f.name.value, this.f.password.value, this.f.email.value, (isFailed: boolean) => {

      if (isFailed) {
        return true;
      }

      currentContext.handleRegisterResponse();
      return false;
    });
  }
  isFormValid() {
    return this.registerForm.valid;
  }
  handleRegisterResponse() {
    this.router.navigate(['/account/login']);
  }

}
