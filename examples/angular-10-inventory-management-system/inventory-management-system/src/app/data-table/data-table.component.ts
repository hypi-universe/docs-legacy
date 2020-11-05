import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {RequestsService} from '../requests.services';
import {inventory} from '../inventory';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';

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
  inventoryDetail: inventory;

  constructor(private req: RequestsService, private http: HttpClient){

  }
  ngOnInit() {

    this.fetchData();
    this.dataSource = new DataTableDataSource();

  }

  fetchData(){
   this.domain = 'product-01.com';
   this.payload = JSON.stringify({  query:'query { \n find(type: Product, arcql:"*"){ \n edges{\n node{\n... on Product {\n hypi{ \n id} \n name \n price \n total \n remaining \n comments}}cursor} \n pageInfo{hasPreviousPage \n hasNextPage \n startCursor \n endCursor \npageLimit \n previousOffsets \n nextOffsets}}}', variables: {'arcql': "*"} });
    const headers = new HttpHeaders()
      .set('hypi-domain', this.domain)
      .set('Authorization', 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmluc3RhbmNlIjp7InJlYWxtIjoiYXllc2hhIiwibmFtZSI6InN0b3JlIiwicmVsZWFzZSI6ImxhdGVzdCJ9LCJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnB1cnBvc2UiOiJsb2dpbiIsImh5cGkudXNlcm5hbWUiOiJheWVzaGE5MDA5QGdtYWlsLmNvbSIsImF1ZCI6ImF5ZXNoYSIsImlhdCI6MTYwMzY5MTk4MCwiZXhwIjoxNjA2MjgzOTgwLCJzdWIiOiIwMUVKR0VFREpUS1haMzhKMEo1RUQ5V1BNUiIsIm5iZiI6MTYwMzY5MTk4MH0.p5EilLvriZAQjdwE1CH5wznqLHwww6tPz1F0NWkQgqBIRlj1OBBL3R77VhthhkQlqQmg41qbfroDf01C6VJ0kd7Wq7L8NJA8l4uGL24UgxvGaZgTGZ2CFaqcBDd0TPwbqBxW0-JXgm_1K4Lqg9Ww3m57O1zFnKVFYbTAump9qdksolar_-jUFgaAWvJ2BtSJ-AecJze9HXIdwYLqEblYE3utt9qjnzZX3WLuZAbP0UcqitdQ8YXsq8cJaDcuAHYEvBKtGzjrvRDNAGLkCqtvtlKxIciJt3vX5Ptc9ZpcyUfqF_Pe4vOygRPVDd_ngSwlP6v85_Ufpxnz0LDpU9bbug').set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    this.http.post('https://api.hypi.app/graphql', this.payload , {headers})
      .pipe(map(data => {

        console.log(data);

      })).subscribe(result => {

    });

   }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
