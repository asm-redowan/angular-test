import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { GroupService } from '../service/group.service';
import { IGroup } from '../../model/interfaces/igroup';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-group',
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
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit{

  @ViewChild('deleteGroupDialog') dialogOneTemplate!: TemplateRef<any>;

  grouplist = signal<IGroup[]>([])
  addGroup?: IGroup
  delGroup: any
  delData:any

  myform!: FormGroup
  formbulider = inject(FormBuilder)

  constructor(
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){
    this.getall()
  }

  ngOnInit(): void {
    this.myform= this.formbulider.group({
      name : ['',[Validators.required]],
      description:['']
    })
  }


  deletealert() {
    this.groupService.deleteGroup(this.delGroup).subscribe((res: any) => {
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


  groupDelete(group: any) {
    this.delData=group.group_name
    const jsonString = JSON.stringify(group);
    const encodedData = btoa(jsonString);
    this.delGroup = { encodedData };
    this.dialog.open(this.dialogOneTemplate, {
      width: '400px'
    });

  }

  createGroup(group: any){
    this.groupService.createGroup(group).subscribe((res:any)=>{
      this.snackBar.open('Create Successfully', 'Close', {
        duration: 5000, 
      });
      this.myform= this.formbulider.group({
        name : [''],
        description:['']
      })
      this.getall()
    },(error:any)=>{
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000, 
      });
    })
  }

  create(){
    try{
      if(this.myform.valid){
        this.addGroup={
          group_name: this.myform.value.name,
          description: this.myform.value.description
        }
        const jsonString = JSON.stringify(this.addGroup);
        const encodedData = btoa(jsonString);
        this.createGroup({ encodedData });

      }else{
        this.myform.markAllAsTouched()
      }
    }catch(error){
      this.snackBar.open("Type Missmatch", 'Close', {
        duration: 5000, 
      });
    }
  }
 
  
  
  getall(){
    this.groupService.getAll().subscribe((res:any)=>{
      this.grouplist.set(res.data)
    },(error:any)=>{
      console.log(error)
    })
  }

}
