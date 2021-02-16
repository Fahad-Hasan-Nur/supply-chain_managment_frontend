import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FILE_SERVICE } from '../../common/constant/api.constants';
import { TaskAttachment } from '../../views/prj-planning/model/task-attachment';
//import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  private  FILE_SERVICE_URL =  environment.GLOBAL_GATEWAY_URL+'/'+environment.FILE_SERVICE_CONTEXT;

  constructor(
    //private userService: UsersService,
              private _http: HttpClient) { }

  public createFormData(oid: string, files?: File[], tag?: string ): FormData {
    const formData = new FormData();
    files.forEach(file =>{
      formData.append('file', file);
      formData.append('title', file.name);
    })
    formData.append('description','prj,'+tag);
    formData.append('tag', 'prj');
    formData.append('oid', oid);
   // formData.append('createdBy', this.userService.usersStorage().employeeId);
    return formData;
  }

  private httpFileOptions = {
    responseType: 'blob' as 'json',
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  };

  public fileUpload (formData: FormData): Observable<any> {
    return this._http.post<any>(
      this.FILE_SERVICE_URL+'/api/v1/uploadAttachment',
      formData
    );
  }
  public downloadFile(fileId: string,fileName: string): void{
    this._http.post<any>(this.FILE_SERVICE_URL+'/api/v1/downloadFile', {"oid":fileId}, this.httpFileOptions).subscribe(
      res =>{
        var a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.download = fileName;
        a.click();
      },err =>{
        console.log(err)
      }
    );
  }
  public getFilesByfileIds(fileIds: string[]){
    return this._http.get<TaskAttachment[]>(FILE_SERVICE+fileIds);
  }
  
}
