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
  public filterData( data, options): Observable<any[]> {
    this.formControl = data;
    this.filteredData = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.json_data_filter(value, options)),
    );
    return this.filteredData;
  }

  private json_data_filter(value: string, options ): string[] {
    const newList = [];
    options.forEach((element) => {
        if (element.name.indexOf(value.toLowerCase()) !== -1) {
          newList.push({ name: element.name, id: element.id });
        }

    });
    return newList;
  }
}

