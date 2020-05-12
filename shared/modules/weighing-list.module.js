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

    this.renderDocumentColumn(tr);

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const th = document.createElement('th');

      th.innerText = column.displayText;
      tr.appendChild(th);
    }

    thead.appendChild(tr);
  },

  renderDocumentColumn(tableRow) {
    const th = document.createElement('th');
    th.innerText = 'Dokumenter';
    tableRow.appendChild(th);
  },

  renderRows() {
    const records = this.weighingList.records;
    if (!records) { return; }

    const tbody = this.docFragment.querySelector('#weighing-list-tbody');

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const tr = document.createElement('tr');
      tr.id = `tr-${record.id}`;

      this.renderCells(record, tr);
      tbody.appendChild(tr);
      this.renderDocuments(record);
    }
  },

  renderCells(record, tableRow) {
    this.renderDocumentCell(record, tableRow);
    this.setDataTypeAndSortOrder(record.values);
    this.sort(record.values);

    for (let i = 0; i < record.values.length; i++) {
      const value = record.values[i];
      const td = document.createElement('td');
      td.innerText = value.value;
      tableRow.appendChild(td);
    }
  },

  renderDocumentCell(record, tableRow) {
    const documentCount = record.documents ? record.documents.length : 0;
    const td = document.createElement('td');
    const label = document.createElement('label');
    label.innerText = documentCount;

    if (documentCount > 0) {
      const li = document.createElement('li');
      li.classList.add('fa', 'fa-chevron-down');
      li.style.paddingRight = '10px';
      li.documentRowId = `document-tr-${record.id}`;
      li.addEventListener('click', this.toggleShowDocuments);

      td.appendChild(li);
    }

    td.appendChild(label);
    tableRow.appendChild(td);
  },

  toggleShowDocuments(event) {
    const li = event.target;
    const tr = document.querySelector(`#${li.documentRowId}`)

    li.classList = [];

    if (tr.style.display === 'none') {
      li.classList.add('fa', 'fa-chevron-up');
      tr.style.display = ''
    } else {
      li.classList.add('fa', 'fa-chevron-down');
      tr.style.display = 'none'
    }
  },

  renderDocuments(record) {
    if (!record.documents) { return; }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);

    const td = document.createElement('td');
    td.colSpan = this.docFragment.querySelector('#weighing-list-thead').firstChild.childNodes.length;
    td.appendChild(table);

    const tr = document.createElement('tr');
    tr.style.display = 'none';
    tr.id = `document-tr-${record.id}`;
    tr.appendChild(td);

    for (let i = 0; i < record.documents.length; i++) {
      const attachedDocument = record.documents[i];
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.innerText = attachedDocument.name;

      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    this.docFragment.querySelector('#weighing-list-tbody').appendChild(tr);
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