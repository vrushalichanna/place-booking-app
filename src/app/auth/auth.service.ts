import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userAuthenticated = false;

get userIsAuthenticated() {
  return this.userAuthenticated;
}
constructor() { }

login() {
 return this.userAuthenticated = true;
}

logout() {
  return this.userAuthenticated = false;
}
}
