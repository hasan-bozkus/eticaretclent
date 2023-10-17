import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastService: CustomToastrService) {

  }

  frm: FormGroup;

  ngOnInit() {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10)
    ]],
      userName: ["",[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)]],
      email: ["", [
        Validators.required,
        Validators.email,
        Validators.maxLength(250),
        Validators.minLength(3)]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]

    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrari = group.get("passwordConfirm").value;
        return sifre === sifreTekrari ? null : {notSame: true};
      }
    });
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid)
      return;


    const result: Create_User = await this.userService.create(user);
    if (result.succeeded)
      this.toastService.message(result.message, "Kullanıcı başarıyla eklendi...", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    else
      this.toastService.message(result.message, "Kullanıcı eklenirken beklenmedik bir hata ile karşılaşıldı...", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
  }

}
