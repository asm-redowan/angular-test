import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
// import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { IUser } from '../../model/interfaces/iuser';
// import { IUser } from '../model/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { 
  }


  alluser = signal<IUser[]>([]);

  getAll(): Observable<any>{
    return this.http.get(environment.MAIN_API_URL+environment.GET_USER_LIST);
  }

  getAllCompanies(): Observable<any>{
    return this.http.get(environment.MAIN_API_URL+environment.GET_COMPANY_LIST);
  }

  getAllGroups(): Observable<any>{
    return this.http.get(environment.MAIN_API_URL+environment.GET_Group_LIST);
  }

  getUserAllInfo(): Observable<any> {
    return this.http.get(environment.MAIN_API_URL+environment.GET_USERInfo_LIST);
  }

  createUser(user:any){
    return this.http.post(environment.MAIN_API_URL+environment.CreateUser,user);
  }

  updateUser(user:any){
      return this.http.put(environment.MAIN_API_URL+environment.UpdateUser,user)
  }

  deleteUser(user:any){
    return this.http.delete(environment.MAIN_API_URL+environment.DeleteUser,{
      body: user
    })
  }

  isEmail(email:any){
    return this.http.post(environment.MAIN_API_URL+environment.ISEMAIL,email);
  }

  clearStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.router.navigate(['/login'])
  }
  
}
