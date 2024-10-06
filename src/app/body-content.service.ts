import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyContentService {
  public appURL = "http://localhost:9000/";

  constructor(private http: HttpClient) {}

  getDocList(data:any): Observable<any> {
    const params= new HttpParams()
    .set('searchQuery', data.searchQuery)
    .set('type',data.type)
    .set('sortBy',data.sortBy)

    // Simple GET request without any query parameters
    return this.http.get(this.appURL + 'doctor/getDocList',{params});
  }
  updateProfile(data:any): Observable<any> {
    // Simple GET request without any query parameters
    return this.http.post(this.appURL + 'doctor/updateProfile',data);
  }
}
