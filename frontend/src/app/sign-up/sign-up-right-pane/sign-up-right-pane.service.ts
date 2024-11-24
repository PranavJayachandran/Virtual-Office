import { Injectable } from '@angular/core';
import { User } from '../../shared/common.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpRightPaneService {
  public backendBaseUrl = environment.backendBaseUrl;
  constructor(private http: HttpClient) {}
  public signUp(user: User): Observable<any>{
    return this.http.post(this.backendBaseUrl + '/sign-up', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
