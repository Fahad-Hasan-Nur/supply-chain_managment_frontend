import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../service/image/image.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
name: any=this.adminService.usersStorage().name;
public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  constructor(
    private imageService: ImageService,
    private adminService: AdminService
  ) { }

  getImage(id) {
    this.imageService.getImageById(id).subscribe
      (
        (response) => {
          this.retrieveResonse = response;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (error) => console.log(error),
      );
  }
  public ngOnInit(): void {
    this.getImage(this.adminService.usersStorage().imageId);

}
}
