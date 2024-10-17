import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(environment.MAIN_API_URL+environment.GET_COMPANY_LIST)
  }

  createCompany(company: any){
    return this.http.post(environment.MAIN_API_URL+environment.CreateCompany,company)
  }

  deleteCompany(company: any){
    return this.http.delete(environment.MAIN_API_URL+environment.DeleteCompany,{
      body:company
    })
  }
}
