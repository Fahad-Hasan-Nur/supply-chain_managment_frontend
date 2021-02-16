import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from '../../model/user';
import { StorageService } from '../storage/storage.service';
import {AUTH} from '../../constant/global-variables.constant'
import { UsersService } from '../../../service/users/users.service';
import { Router } from '@angular/router';
import {environment} from "../../../../environments/environment";
import {StateService} from "../state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router,
             private storage:StorageService,
             private stateService: StateService,
             private usersService :UsersService) {
  }

  private getDecodedAccessToken(token: string): Promise<User> {
    return new Promise((resolved,reject) =>{
      try {
        this.storage.save(AUTH.TOKEN, token);
        let user = new User();
        let tokenValue = jwt_decode(token);
        console.log(tokenValue.employeeId)
        user.employeeId = tokenValue.employeeId;
        user.username = tokenValue.user_name;
        user.oid = tokenValue.userOid;
        user.employeeOfficeId = tokenValue.employeeOfficeId;
        user.officeOid = tokenValue.officeId;
        user.exp = tokenValue.exp;
        resolved(user);
      } catch (error) {
        console.log('token decode exception');
        console.log(error)
        this.router.navigate(['/unauthorized']);
        resolved(null);
      }
    })
  }

  public async saveToken(params:any):  Promise<boolean> {
    console.log(params);
    return await this.currentUserSave(await this.getDecodedAccessToken(params));
  }

  private currentUserSave(user: User): Promise<boolean> {
   return new Promise((resolved,reject) =>{
    this.usersService.getUserInfo(user.employeeId).subscribe(
      res => {
        user.username = <string>res.name;
        user.projectId = <string> res.project;
        console.log(res)
        this.stateService.setUser(user);
        this.storage.save(AUTH.CURRENT_USER, user);
        resolved(true);
      },
      err => {
       console.log(err);
       resolved(false);
       this.router.navigate(['/unauthorized']);
      })
   })

  }

  public isTokenValid(user: User): boolean {
    if (user) {
      console.log(user.exp * 1000);

      if (new Date(user.exp * 1000) < (new Date)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  // getCurrentUserRole(): Observable<string[]> {
  //   this.currentUserValue.oid;
  //   return this.userRoles.getRolesByOid("")
  //     .pipe(
  //        map(res => res.data.content.map(role => role.roleTag))
  //     );
  // }
  public logout() {
    localStorage.clear();
    this.storage.clear();
    window.location.replace(environment.LOG_IN_API_Endpoint)
    }
}
