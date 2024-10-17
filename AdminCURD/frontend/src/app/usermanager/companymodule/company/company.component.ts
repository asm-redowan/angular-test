import { Component, inject, Inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ICompany } from '../../model/interfaces/icompany';
import { CompanyService } from '../service/company.service';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatChipsModule
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {

  @ViewChild('deleteComapnyDialog') dialogOneTemplate!: TemplateRef<any>;

  companyList = signal<ICompany[]>([])
  myform!: FormGroup
  formbulider = inject(FormBuilder)
  addcompany?: ICompany
  delData:any
  delCompany: any

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getall()
    this.myform = this.formbulider.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      package: ['', [Validators.required]],
      description: ['']
    })
  }

  getall() {
    this.companyService.getAll().subscribe((res: any) => {
      this.companyList.set(res.data)
    })
  }

  create(company: any) {
    this.companyService.createCompany(company).subscribe((req: any) => {
      this.myform = this.formbulider.group({
        name: [''],
        email: [''],
        package: [''],
        description: ['']
      })
      this.snackBar.open('Create Successfully', 'Close', {
        duration: 5000,
      });
      this.getall()
    },(error:any)=>{
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000,
      });
    })
  }

  companycreate() {
    try {
      this.addcompany = {
        name: this.myform.value.name,
        email: this.myform.value.email,
        package: this.myform.value.package,
        description: this.myform.value.description
      }
      const jsonString = JSON.stringify(this.addcompany);
      const encodedData = btoa(jsonString);
      this.create({ encodedData });

    } catch (error) {
      this.snackBar.open("Type Missmatch", "Close", {
        duration: 5000,
      })
    }
  }


  deletealert() {
    this.companyService.deleteCompany(this.delCompany).subscribe((res: any) => {
      this.snackBar.open('Delete Successfully', 'Close', {
        duration: 5000, 
      });
      this.getall()
    },(error:any)=>{
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000, 
      });
    })
  }


  companyDelete(company: any) {
    this.delData = company.name
    const jsonString = JSON.stringify(company);
    const encodedData = btoa(jsonString);
    this.delCompany = { encodedData };
    this.dialog.open(this.dialogOneTemplate, {
      width: '400px'
    });

  }



}
