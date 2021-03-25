import { MatPaginatorIntl } from '@angular/material';

const bnRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 of ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${length} of ${startIndex + 1} - ${endIndex}`;
};

export function getBnPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Items Per Page :';
  paginatorIntl.nextPageLabel = 'Next Page';
  paginatorIntl.previousPageLabel = 'Previous Page';
  paginatorIntl.getRangeLabel = bnRangeLabel;
  return paginatorIntl;
}
