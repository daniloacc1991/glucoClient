import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { TiraGluco } from '../../models/tira-glucometria';

// TODO: Replace this with your own data model type
// export interface ViewGlucosItem {
//   date: number;
//   id: number;
// }

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: ViewGlucosItem[] = [];

/**
 * Data source for the ViewGlucos view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ViewGlucosDataSource extends DataSource<TiraGluco> {
  data: TiraGluco[] = [];

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TiraGluco[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TiraGluco[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TiraGluco[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'beforeBreakfast': return compare(+a.beforeBreakfast, +b.beforeBreakfast, isAsc);
        case 'afterBreakfast': return compare(+a.afterBreakfast, +b.afterBreakfast, isAsc);
        case 'beforeLunch': return compare(+a.beforeLunch, +b.beforeLunch, isAsc);
        case 'afterLunch': return compare(+a.afterLunch, +b.afterLunch, isAsc);
        case 'beforeDinner': return compare(+a.beforeDinner, +b.beforeDinner, isAsc);
        case 'afterDinner': return compare(+a.afterDinner, +b.afterDinner, isAsc);
        case 'key': return compare(+a.key, +b.key, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
