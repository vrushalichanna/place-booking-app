import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private userAuthenticated = false;
public  userId = 'ABC';

get userIsAuthenticated() {
  return this.userAuthenticated;
}
get UserId() {
  return this.userId;
}
constructor() { }

login() {
 return this.userAuthenticated = true;
}

logout() {
  return this.userAuthenticated = false;
}
}
