import { WeighingListDefinition } from '../models/weighing-list-definition.model.js';
import { WeighingList } from '../models/weighing-list.model.js';
import { ColumnDefinition } from '../models/column-definition.model.js';
import { ColumnValue } from '../models/column-value.model.js';
import { WeighingListDataType } from '../enums/weighing-list-data-type.enum.js';
import { WeighingListRecord } from '../models/weighing-list-record.model.js';

export const WeighingListModule = {

  docFragment: new DocumentFragment(),
  numArticles: 5,
  weighingList: undefined,
  language: [],

  init() {
    console.log('WeighingListModule loaded');
    this.weighingList = this.getWeighingList();
    this.renderWeighingList();
    this.bindUIActions();
  },

  bindUIActions() { },

  renderWeighingList() {
    this.renderTable();
    this.renderColumns();
    this.renderRows();

    document.querySelector('#weighing-list').appendChild(this.docFragment);
  },

  renderTable() {
    const table = document.createElement('table');
    table.id = 'weighing-list-table'
    this.docFragment.appendChild(table);
  },

  renderColumns() {
    const columns = this.weighingList.definition.columns;
    if (!columns) { return; }

    this.sort(columns);

    const table = this.docFragment.querySelector('#weighing-list-table');
    const tr = document.createElement('tr');

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const th = document.createElement('th');
      
      th.innerText = column.displayText;
      tr.appendChild(th);
    }

    table.appendChild(tr);
  },

  renderRows() {
    const records = this.weighingList.records;
    if (!records) { return; }

    const table = this.docFragment.querySelector('#weighing-list-table');

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const tr = document.createElement('tr');
      
      this.renderCells(record.values, tr);
      table.appendChild(tr);
    }
  },

  renderCells(columnValues, tableRow) {
    this.setDataTypeAndSortOrder(columnValues);
    this.sort(columnValues);

    for (let i = 0; i < columnValues.length; i++) {
      const value = columnValues[i];
      const td = document.createElement('td');
      td.innerText = value.value;
      tableRow.appendChild(td);
    }
  },

  sort(elements) {
    elements.sort((a, b) => (a.sortOrder > b.sortOrder) ? 1 : -1)
  },

  setDataTypeAndSortOrder(columnValues) {
    for (let i = 0; i < columnValues.length; i++) {
      const value = columnValues[i];
      const columnDefinition = this.getColumnDefinition(value.navColumnId);
      value.sortOrder = columnDefinition.sortOrder;
      value.dataType = columnDefinition.dataType;
    }
  },

  getColumnDefinition(navColumnId) {
    const columns = this.weighingList.definition.columns;

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];

      if (navColumnId === column.navColumnId) {
        return column;
      }
    }
  },

  getWeighingList() {
    const weighingList = new WeighingList();
    weighingList.definition = this.getWeighingListDefinition();
    weighingList.records = this.getRecords();
    return weighingList;
  },

  getWeighingListDefinition() {
    const weighingListDefinition = new WeighingListDefinition()
    weighingListDefinition.columns = this.getColumns();
    return weighingListDefinition;
  },

  getColumns() {
    const column1 = new ColumnDefinition()
    column1.navColumnId = 1;
    column1.displayText = 'Dato';
    column1.dataType = WeighingListDataType.Date;
    column1.sortOrder = 1;

    const column2 = new ColumnDefinition()
    column2.navColumnId = 2;
    column2.displayText = 'String';
    column2.dataType = WeighingListDataType.String;
    column2.sortOrder = 2;

    const column3 = new ColumnDefinition()
    column3.navColumnId = 3;
    column3.displayText = 'Dropdown';
    column3.dataType = WeighingListDataType.Dropdown;
    column3.sortOrder = 3;

    const column4 = new ColumnDefinition()
    column4.navColumnId = 4;
    column4.displayText = 'Bool';
    column4.dataType = WeighingListDataType.Bool;
    column4.sortOrder = 4;

    return [column2, column3, column4, column1];
  },

  getRecords() {
    const columnValue1 = new ColumnValue();
    columnValue1.navColumnId = 1;
    columnValue1.value = 'En';

    const columnValue2 = new ColumnValue();
    columnValue2.navColumnId = 2;
    columnValue2.value = 'To';

    const columnValue3 = new ColumnValue();
    columnValue3.navColumnId = 3;
    columnValue3.value = 'Tre';

    const columnValue4 = new ColumnValue();
    columnValue4.navColumnId = 4;
    columnValue4.value = 'Fire';

    const record = new WeighingListRecord();
    record.values = [columnValue2, columnValue4, columnValue3, columnValue1]

    const records = [record];

    return records;
  }
}