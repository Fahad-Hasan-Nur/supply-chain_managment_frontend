import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import {AUTH} from '../../constant/global-variables.constant'
// import { UsersService } from '../../../service/users/users.service';
import { Router } from '@angular/router';
import {environment} from "../../../../environments/environment";
import {StateService} from "../state.service";
import { Admin } from '../../model/admin';
import { AdminService } from '../../../service/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router,
             private storage:StorageService,
             private stateService: StateService,
             private adminService :AdminService) {
  }

  private getDecodedAccessToken(token: string): Promise<Admin> {
    return new Promise((resolved,reject) =>{
      try {
        this.storage.save(AUTH.TOKEN, token);
        let user = new Admin();
        let tokenValue = jwt_decode(token);
        user.email = tokenValue.sub;
        // user.username = tokenValue.user_name;
        // user.oid = tokenValue.userOid;
        // user.employeeOfficeId = tokenValue.employeeOfficeId;
        // user.officeOid = tokenValue.officeId;
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
    return await this.currentUserSave(await this.getDecodedAccessToken(params));
  }

  private currentUserSave(admin: Admin): Promise<boolean> {
   return new Promise((resolved,reject) =>{
    this.adminService.getAdminInfo(admin.email).subscribe(
      res => {
        admin = res;
        this.stateService.setAdmin(admin);
        this.storage.save(AUTH.CURRENT_USER, admin);
        resolved(true);
      },
      err => {
       console.log(err);
       resolved(false);
       this.router.navigate(['/unauthorized']);
      })
   })

  }

  public isTokenValid(admin: Admin): boolean {
    if (admin) {
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
