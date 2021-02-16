import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FinanceCost} from "../../model/finance-cost";
import {ConfirmationComponent} from "../../../../../../common/component/confirmation/confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {warn_message} from "../../../../../../common/constant/messages";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['উৎস', 'জিওবি', 'নিজস্ব অর্থায়ন', 'অন্যান্য', 'অ্যাকশন'];
  dataSource = new MatTableDataSource<FinanceCost>(data);

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    this.dataSource.data.push({source: '', gob: '', finance: '', other: ''});
    console.log(this.dataSource.data.length)
    this.dataSource.filter = "";
  }

  save(element: FinanceCost) {
    console.log(element)
  }

  edit(id: string) {

    document.querySelectorAll('.element' + id).forEach(ob => {
      if (document.getElementById('view' + id).className === 'fa fa-edit') {
        ob.removeAttribute("readonly")
        ob.setAttribute("style", "border: 1px solid; border-color: black;");
      } else {
        ob.setAttribute("readonly", "true");
        ob.setAttribute("style", "border: 0px;");
      }
    });

    if (document.getElementById('view' + id).className === 'fa fa-edit') {
      document.getElementById('view' + id).className = 'fa fa-eye';
    } else {
      document.getElementById('view' + id).className = 'fa fa-edit';
    }

  }

  cancel(element: FinanceCost) {
    let message = warn_message.DELETE_ELEMENT_PART_2;
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '40%',
      data: {value: null, message: message}
    });
    dialogRef.afterClosed().subscribe(ob => {
      if (ob !== undefined) {
        this.dataSource.data = this.dataSource.data.filter(data => data !== element)
        this.dataSource.filter = "";
      }
    }, error => {

    }, () => {

    })
  }
}

const data: FinanceCost[] = [
  {source: 'A', gob: '1', finance: '12121', other: 'অন্যান্য'}
];


