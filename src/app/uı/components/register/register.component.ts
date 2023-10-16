import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {

  }

  frm: FormGroup;

  ngOnInit() {
    this.frm = this.formBuilder.group({
      adSoyad: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10)
    ]],
      kullaniciadi: ["",[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)]],
      email: ["", [
        Validators.required,
        Validators.email,
        Validators.maxLength(250),
        Validators.minLength(3)]],
      sifre: ["", [Validators.required]],
      sifreTekrari: ["", [Validators.required]]

    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("sifre").value;
        let sifreTekrari = group.get("sifreTekrari").value;
        return sifre === sifreTekrari ? null : {notSame: true};
      }
    });
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  onSubmit(data: User) {
    this.submitted = true;

    if (this.frm.invalid)
      return;
  }

}
