import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drag-drop'; myArray = [];
  @ViewChild('table', { static: true }) table: MatTable<PeriodicElement>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  isInvalidDragEvent = false;
  // onListDrop(event: CdkDragDrop<string[]>) {
  //   // Swap the elements around
  //   moveItemInArray(this.myArray, event.previousIndex, event.currentIndex);
  // }

  // dropTable(event: CdkDragDrop<PeriodicElement[]>) {
  //   const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
  //   moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
  //   this.table.renderRows();
  // }
  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    if (this.isInvalidDragEvent) {
      this.isInvalidDragEvent = false;
      return;
    }
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  onInvalidDragEventMouseDown() {
    this.isInvalidDragEvent = true;
  }
  dragStarted(event, index) {
    if (this.isInvalidDragEvent) {
      document.dispatchEvent(new Event('mouseup'));
      console.log('row index', index);
    }

    console.log('row index', index);
  }
  dragEnd(event, index) {
    console.log('index end ', index);
    console.log('event end ', event);
    // document.dispatchEvent(new Event('mouseup'));
  }
  tableIndex() {
    console.log('table index', this.table);
  }

}
