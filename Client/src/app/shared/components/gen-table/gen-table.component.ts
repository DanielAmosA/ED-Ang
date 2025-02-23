import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { rowAnimation, tableAnimation } from '../../animations/animations';
import { Base } from '../../../core/models/base.model';

@Component({
  selector: 'app-gen-table',
  standalone:true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './gen-table.component.html',
  styleUrl: './gen-table.component.scss',
  animations: [tableAnimation, rowAnimation]
})

// Responsible for generic table
export class GenTableComponent<TGenTable extends Base> {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() set data(value: TGenTable[]) {
    this.dataSource = new MatTableDataSource(value);
  }
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 10;

  @Output() onEdit = new EventEmitter<TGenTable>();
  @Output() onDelete = new EventEmitter<TGenTable>();
  @Output() onPageChange = new EventEmitter<any>();

  dataSource!: MatTableDataSource<TGenTable>;
  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = [
      ...this.columns.map((column) => column.key),
      'actions',
    ];
  }
}
