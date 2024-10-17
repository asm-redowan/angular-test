import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { IUser } from '../../model/interfaces/iuser';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LayoutComponent } from '../../../layout/layout.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { UserService } from '../../service/user.service';
import { AdduserComponent } from '../adduser/adduser.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    LayoutComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @ViewChild('deleteDialogTemplate') dialogOneTemplate!: TemplateRef<any>;

  selectedRows: IUser[] = [];

  istrue: boolean = false
  arrow: any = {
    name: "↕",
    email: "↕",
    companyName: "↕",
    groupName: "↕"
  }
  router = inject(Router)
  usersre = inject(UserService)
  static addfailed = false;
  delUser: any;
  delData: any;
  email = localStorage.getItem('email')

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getall()
  }

  // userlist : IUser[] =[]
  userlist = this.usersre.alluser


  sortBy(property: keyof IUser, order: 'asc' | 'desc') {
    this.userlist().sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return order === 'asc' ? 1 : -1;
      if (valueB == null) return order === 'asc' ? -1 : 1;

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  toggle(property: keyof IUser, identity: string) {
    this.istrue = !this.istrue
    for (let key in this.arrow) {
      if (key !== identity) {
        this.arrow[key] = "↕";
      }
    }
    if (this.istrue) {
      this.arrow[identity] = "↓";
      this.sortBy(property, 'asc')
    } else {
      this.arrow[identity] = "↑";
      this.sortBy(property, 'desc')
    }
  }

  getall() {
    console.log("getall func", localStorage.getItem('token'))
    this.usersre.getUserAllInfo().subscribe((res: any) => {
      this.usersre.alluser.set(res.data)
    }, (error: any) => {
      this.usersre.clearStorage()
    })
  }

  deletealert() {
    this.usersre.deleteUser(this.delUser).subscribe((res: any) => {
      this.getall()
    })
  }


  deleteuser(user: any) {
    const jsonString = JSON.stringify(user);
    this.delData = user.name
    const encodedData = btoa(jsonString);
    this.delUser = { encodedData };
    this.dialog.open(this.dialogOneTemplate, {
      width: '400px'
    });

  }

  openEditDialog(user: IUser): void {
    const dialogRef = this.dialog.open(EdituserComponent, {
      width: '550px',
      data: user
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AdduserComponent, {
      disableClose: true,
      width: '550px'
    });
  }

  ngOnInit(): void {
    console.log("ng on init")
  }


  onRowSelect(row: IUser): void {
    if (row.selected) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows = this.selectedRows.filter(r => r.id != row.id);
    }
  }

  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.selectedRows = [];

    this.userlist().forEach(row => {
      row.selected = isChecked;
      if (isChecked && row.email != this.email) {
        this.selectedRows.push(row);
      }
    });
  }


  exportToExcel(): void {
    if (this.selectedRows.length != 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selectedRows);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'table_data');
    }else{
      this.snackBar.open('Not selected Items', 'Close', {
        duration: 5000,
      });
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }

  exportToCSV(): void {
    if (this.selectedRows.length != 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selectedRows);
      const csv: string = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: 'text/csv' });
      saveAs(blob, 'table_data.csv');
    } else {
      this.snackBar.open('Not selected Items', 'Close', {
        duration: 5000,
      });
    }

  }
}
