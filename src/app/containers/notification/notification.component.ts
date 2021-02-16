// import {Component, OnInit, ViewChild} from '@angular/core';
// import {timer} from 'rxjs';
// // import {
// //   INotificationCountRequest,
// //   INotificationData,
// //   INotificationRequest,
// //   IOidsRequestBody,
// //   NotificationService
// // } from '../../views/modules/asset/core/services/notification.service';
// import {Router} from '@angular/router';
// import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'ast-notification',
//   templateUrl: './notification.html',

// })
// export class NotificationComponent implements OnInit {

//   unSeenCount = 0;
//   unSeenOids = [];

//   @ViewChild('drop1', {static: false})
//   private dropdown: NgbDropdown;


//   constructor(private _router: Router) {
//   }

//   ngOnInit(): void {
//     timer(0, 1000 * 30).subscribe(x => {
//       this.getNotificationCount();
//     });
//   }

//   clickSeeAll() {
//     // const request: IOidsRequestBody = {} as IOidsRequestBody;
//     // request.oids = this.unSeenOids;
//     // if (request.oids.length > 0) {
//     //   this._notification.changeStatus(request)
//     //     .subscribe(result => {
//     //       this.getNotificationCount();
//     //       this.dropdown.close();
//     //       this._router.navigateByUrl('/asset/notification');
//     //     });
//     // } else {
//     //   this.dropdown.close();
//     //   this._router.navigateByUrl('/asset/notification');
//     // }
//   }

//   checkDropDown(val, event) {
//     // if (val) {
//     //   this.updateNotification(this.notifications.map(i => i.oid));
//     // } else {
//     //   this.getNotificationCount();
//     // }
//   }


//   updateNotification(oids: string[]) {
//     // const request: IOidsRequestBody = {} as IOidsRequestBody;
//     //   request.oids = oids;
//     //   if (request.oids.length > 0) {
//     //     this._notification.changeStatus(request)
//     //       .subscribe(result => {
//     //       });
//     //   }
//   }

//   clickNotification(event) {
//     this._router.navigateByUrl(event['url']);
//   }

//   private getNotification(limit) {
//     // const request: INotificationRequest = {} as INotificationRequest;
//     // request.moduleCode = 'AST';
//     // request.searchParam = {status: 'DELIVERED', limit: limit, offset: 0, searchText: '' };
//     // this._notification.getNotificationList(request)
//     //   .subscribe(result => {
//     //     const notification = result.data.filter(i => i.status === 'DELIVERED');
//     //     this.unSeenCount = notification.length;
//     //     this.unSeenOids = notification.map(i => i.oid );
//     //     this.notifications = notification.slice(0, 5);

//     //   });
//   }

//   private getNotificationCount() {
//     // const request: INotificationCountRequest = {} as INotificationCountRequest;
//     // request.moduleCode = 'AST';
//     // request.status = ['DELIVERED', 'SEEN', 'NOT_SENT'];
//     // this._notification.getNotificationCount(request)
//     //   .subscribe(result => {
//     //     const count = result.data.notificationCount;
//     //     if (count > 0) {
//     //       this.getNotification(count);
//     //     }
//     //   });
//   }
// }
