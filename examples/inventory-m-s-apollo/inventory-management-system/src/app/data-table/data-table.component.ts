import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { Subscription } from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const ProductFetching = gql`{
  find(type: Product, arcql:"*"){
    edges{
      node{
        ... on Product {
          name
          hypi {
          id
          }
          price
          total
          remaining
          comments
        }
      }
      cursor
    }
    pageInfo{
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
      pageLimit
      previousOffsets
      nextOffsets
    }
  }
}`;


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'code', 'remaining', 'total', 'comments', 'price'];

  domain: string;
  payload: string;
  loading: boolean;

  private querySubscription: Subscription;
  constructor( private apollo: Apollo){
  }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: ProductFetching
    })
      .valueChanges
      .subscribe(({ data }) => {
      console.log(data);
      });
    this.dataSource = new DataTableDataSource();
  }

/*  fetchData(): void{
    this.data = this.apollo
      .watchQuery({query: ProductFetching, variables: {arcql: '*'}})
      .valueChanges.pipe(map(({data}) => data)

      );

  }*/

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
