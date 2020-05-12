import { WeighingListService } from '../services/weighing-list.service.js';

export const WeighingListModule = {

  docFragment: new DocumentFragment(),
  numArticles: 5,
  weighingList: undefined,
  language: [],

  init() {
    console.log('WeighingListModule loaded');
    this.weighingList = WeighingListService.getDummyList();
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

    const thead = document.createElement('thead')
    thead.id = 'weighing-list-thead'
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody')
    tbody.id = 'weighing-list-tbody'
    table.appendChild(tbody);

    this.docFragment.appendChild(table);
  },

  renderColumns() {
    const columns = this.weighingList.definition.columns;
    if (!columns) { return; }

    this.sort(columns);

    const thead = this.docFragment.querySelector('#weighing-list-thead');
    const tr = document.createElement('tr');

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const th = document.createElement('th');

      th.innerText = column.displayText;
      tr.appendChild(th);
    }

    thead.appendChild(tr);
  },

  renderRows() {
    const records = this.weighingList.records;
    if (!records) { return; }

    const tbody = this.docFragment.querySelector('#weighing-list-tbody');

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const tr = document.createElement('tr');

      this.renderCells(record.values, tr);
      tbody.appendChild(tr);
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
}