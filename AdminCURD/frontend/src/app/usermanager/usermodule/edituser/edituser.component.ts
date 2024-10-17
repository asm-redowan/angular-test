import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { IGroup } from '../../model/interfaces/igroup';
import { ICompany } from '../../model/interfaces/icompany';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [
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
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {

  myform!: FormGroup;
  inputdata: any;
  editdata: any;
  grouplist: IGroup[] = []
  companylist: ICompany[] = []

  closemessage = 'closed using directive'
  router = inject(Router)
  data: any = inject(MAT_DIALOG_DATA)
  group_id: any
  company_id: any
  updateuser: any
  private buildr = inject(FormBuilder)

  constructor(
    private ref: MatDialogRef<EdituserComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    this.group_id = this.data.group_id
    this.company_id = this.data.company_id
    this.myform = this.buildr.group({
      name: [this.data.name, [Validators.required]],
      email: [{ value: this.data.email, disabled: true }, [Validators.required, Validators.email]],
      group: [this.data.group_id, Validators.required],
      company: [this.data.company_id, Validators.required]
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

  getall() {
    this.userService.getUserAllInfo().subscribe((res: any) => {
      this.userService.alluser.set(res.data)
    }, (error: any) => {
      this.userService.clearStorage()
    })
  }

  updateUser(user: any) {
    this.userService.updateUser(user).subscribe((res: any) => {
      this.getall()
      this.snackBar.open("Edit Successfully", 'Close', {
        duration: 5000, 
      });
    })
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  save() {
    if (this.myform.valid) {
      this.updateuser = {
        id: this.data.id,
        name: this.myform.value.name,
        group_id: this.myform.value.group,
        company_id: this.myform.value.company
      }
      const jsonString = JSON.stringify(this.updateuser);
      const encodedData = btoa(jsonString);
      this.updateUser({ encodedData });
      this.ref.close('Form Saved');
    } else {
      this.myform.markAllAsTouched();
    }
  }


}
