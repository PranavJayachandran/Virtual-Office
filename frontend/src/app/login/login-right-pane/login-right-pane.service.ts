import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/common.interface';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LoginRightPaneService {
  constructor(private http: HttpClient) {}
  private backendBaseUrl = environment.backendBaseUrl;
  public login(user: User): Observable<any> {
    return this.http.post(this.backendBaseUrl + '/auth/login', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
