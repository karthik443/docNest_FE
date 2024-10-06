import { HttpClient ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  public appURL="http://localhost:9000/"
  constructor(private http: HttpClient) {}

  loadImage(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }
  signUp(body: any): Observable<any> {
    return this.http.post(this.appURL+'user/signUp', body);
  }
  login(user:any):Observable<any>{

    const params= new HttpParams()
    .set('userName', user.userName)
    .set('password', user.password)

    return this.http.get(this.appURL+'user/login',{params})
  }
}
