import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ConfirmationComponent } from '../../../../../../common/component/confirmation/confirmation.component';
import { PROJECT } from '../../../../../../common/constant/global-variables.constant';
import { success_message, warn_message } from '../../../../../../common/constant/messages';
import { StorageService } from '../../../../../../common/service/storage/storage.service';
import { ToastService } from '../../../../../../common/service/toast.service';
import { FileManagerService } from '../../../../../../service/file/file-manager.service';
import { TaskService } from '../../../../../../service/task/task.service';
import { UsersService } from '../../../../../../service/users/users.service';
import { Task } from '../../../../model/task';
import { TaskAttachment } from '../../../../model/task-attachment';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {
  uploadedFiles: Array<File> = new Array<File>();
  @Input() task: Task;
  filesToEmit: Array<File>;
  attachments: Array<TaskAttachment>;
  attachmentType: string;
  displayedColumns: string[] = ['serialNo', 'fileName', 'actions'];
  newAttachment: TaskAttachment;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
     private storage: StorageService,
     private userService: UsersService,
     private service: TaskService, 
     private toastService: ToastService, 
     public fileService: FileManagerService) {
    this.attachmentType = 'wp';
    this.attachments = new Array<TaskAttachment>();
    this.filesToEmit = new Array<File>();
   }

  ngOnInit() {
    this.fileService.getFilesByfileIds(this.task.attachments).subscribe(res=>{
       console.log(res);
       this.attachments = res;
       this.dataSource = new MatTableDataSource(this.attachments);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    });
  }
  openDialog(type: string): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '350px',
      data: FileList
    });
    dialogRef.afterClosed().subscribe(result => {
      this.uploadedFiles = result;
      this.upload();
    });
  }
  upload() {
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      this.newAttachment = new TaskAttachment();
      this.newAttachment.attachmentType = 'wp';
      this.newAttachment.title = this.uploadedFiles[i].name;
      this.newAttachment.fileType = this.uploadedFiles[i].type;
      this.attachments.push(this.newAttachment);
      this.filesToEmit.push(this.uploadedFiles[i]);
  }
   this.fileService.fileUpload(this.fileService.createFormData(this.task.id, this.filesToEmit,"task")).subscribe(res=> {
     //this.fileService.downloadFile(res.data[0].fileOid, res.data[0].fileName);
     console.log("-----response------")
     console.log(res)
     for (var index in res.data) {
      this.task.attachments.push(res.data[index].fileOid)
    }
     this.update(this.task);
   });
    this.dataSource = new MatTableDataSource(this.attachments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  downlaod(item){
    this.fileService.downloadFile(item.id, item.title);
  }
  update(task){
    this.service.updateTask(task).subscribe(res=>{
      this.projectOfTasks();
      this.toastService.openSnackBar(success_message.SAVED_SUCCESSFULLY,this.toastService.ACTION_SUCESS,this.toastService.CLASS_NAME_SUCESS)
    },error=>{
      this.toastService.openSnackBar(success_message.FAILD,this.toastService.ACTION_WRONG,this.toastService.CLASS_NAME_WRONG)
    })
  }
  private projectOfTasks(){
    this.service.getTasksByPrjId(this.userService.usersStorage().projectId).subscribe(
      res => {
        this.storage.remove(PROJECT.PROJECT_OF_TASKS);
        this.storage.save(PROJECT.PROJECT_OF_TASKS,res);
        console.log(this.storage.read(PROJECT.PROJECT_OF_TASKS)); 
      },error => {
        console.log(error);
      }
    )
  }
  deleteFile(event) {
    this.attachments.splice(event, 1);
    this.filesToEmit.splice(event, 1);
    this.dataSource = new MatTableDataSource(this.attachments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  protected settingsName: string;
  protected message: string;
  delete(data, index) {
    this.message = warn_message.DELETE_ELEMENT_PART_2;
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '40%',
      data: {value: this.settingsName, message: this.message}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.task.attachments = this.task.attachments.filter(r=> r != data.id);
        this.update(this.task)
        this.attachments.splice(index, 1);
        console.log(this.attachments)
        this.dataSource = new MatTableDataSource(this.attachments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: 'file-upload-modal.html',
})
export class FileUploadDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileList) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addNew(event) {
    this.data = event['srcElement'].files;
  }
}
