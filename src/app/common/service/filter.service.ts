import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filteredData: Observable<any[]>;
  private formControl = new FormControl();

// input parameter::::     formControl: new FormControl()   and  options: Modal   and  boolean: Boolean
// boolean true for filtering and  false for select
// Store returned data in Observable<any[]>
  public filterData( formControl, options, boolean: Boolean): Observable<any[]> {
    this.formControl = formControl;
    this.filteredData = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.json_data_filter(value, options, boolean)),
    );
    return this.filteredData;
  }

  private json_data_filter(value: string, options, boolean ): string[] {
    const newList = [];
    options.forEach((element) => {
      if (boolean == true) {
        if (element.name.indexOf(value.toLowerCase()) !== -1) {
          newList.push({ name: element.name, id: element.id });
        }
      } else {
        newList.push({ name: element.name, id: element.id });
      }
    });
    return newList;
  }
}

