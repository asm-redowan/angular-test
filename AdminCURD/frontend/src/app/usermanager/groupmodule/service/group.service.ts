import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(environment.MAIN_API_URL+environment.GET_Group_LIST)
  }

  createGroup(group:any){
    return this.http.post(environment.MAIN_API_URL+environment.CreateGroup,group)
  }

  deleteGroup(group : any){
    return this.http.delete(environment.MAIN_API_URL+environment.DeleteGroup,{
      body:group
    })
  }
}
