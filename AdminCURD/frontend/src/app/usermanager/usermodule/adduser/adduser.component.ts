import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';
import { IGroup } from '../../model/interfaces/igroup';
import { ICompany } from '../../model/interfaces/icompany';
import { IUserAdd, UserClass } from '../../model/class/userclass/user-class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
// import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [
    RouterModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    JsonPipe
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
  // providers: [UserClass]
})
export class AdduserComponent implements OnInit{
  myform!: FormGroup;
  inputdata: any;
  grouplist: IGroup[] = []
  companylist: ICompany[] = []
  adduser?: IUserAdd
  private buildr = inject(FormBuilder)
  router = inject(Router)
  isExist: boolean = false

  constructor(
    private ref: MatDialogRef<AdduserComponent>,
    private userService: UserService,
    private useradd: UserClass,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.inputdata = []
    this.myform = this.buildr.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      group: ['', Validators.required],
      company: ['', Validators.required],
      passwords: this.buildr.group({
        password: new FormControl<string>('', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        confirmPassword: new FormControl<string>('', [Validators.required])
      }, {
        validators: this.confirmPasswordMatch('password', 'confirmPassword') 
      }
      )
    });

    this.getAllgroup();
    this.getAllcompany()
  }

  getAllgroup() {
    this.userService.getAllGroups().subscribe((res: any) => {
      this.grouplist = res.data
    })
  }
  getAllcompany() {
    this.userService.getAllCompanies().subscribe((res: any) => {
      this.companylist = res.data
    })
  }

  getall(){
    this.userService.getUserAllInfo().subscribe((res:any)=>{
      this.userService.alluser.set(res.data)
    },(error:any)=>{
      this.userService.clearStorage()
    })
  }

  createUser(user: any) {
    this.userService.createUser(user).subscribe((res: any) => {
      this.snackBar.open('Create Successfully', 'Close', {
        duration: 5000, 
      });
      this.getall()

    }, (error: any) => {
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000, 
      });

      // alert(error.error.message)
    })
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  save() {
    try {
      if (this.myform.valid) {
        this.adduser = {
          name: this.myform.value.name,
          email: this.useradd.createEmailType(this.myform.value.email),
          password: this.useradd.isPasswordValid(this.myform.value.passwords.password),
          group_id: this.myform.value.group,
          company_id: this.myform.value.company
        }
        console.log(this.adduser);

        const jsonString = JSON.stringify(this.adduser);
        const encodedData = btoa(jsonString);
        this.createUser({ encodedData });

        this.ref.close('Form Saved');


      } else {
        this.myform.markAllAsTouched();
      }

    } catch (error) {
        alert(error)
    }

  }


  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['confirmPasswordMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  

  

  get passwordControl(): FormControl {
    return this.myform.get('passwords')?.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.myform.get('passwords')?.get('confirmPassword') as FormControl;
  }
  get getemail(): FormControl {
    return this.myform.get('email') as FormControl;
  }


}
