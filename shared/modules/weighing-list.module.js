import { WeighingListService } from '../services/weighing-list.service.js';
import { FileExtension } from '../enums/file-extension.enum.js';
import { WeighingListDataType } from '../enums/weighing-list-data-type.enum.js';

let state;
let component;

export const WeighingListModule = {

  state: {
    docFragment: new DocumentFragment(),
    weighingList: undefined,
    language: [],
    pageSize: 20,
    pageIndex: 0,
  },

  init() {
    console.log('WeighingListModule loaded');
    component = this;
    state = this.state;
    state.weighingList = WeighingListService.getDummyList();
    this.renderPagination();
    this.renderWeighingList();
    this.bindUIActions();

    document.querySelector('#weighing-list').appendChild(state.docFragment);
  },

  bindUIActions() { },

  renderPagination() {
    if (state.weighingList.totalCount <= state.pageSize) {
      return;
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Næste';
    nextBtn.addEventListener('click', this.next);

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Tilbage';
    prevBtn.addEventListener('click', this.prev);

    state.docFragment.appendChild(prevBtn);
    state.docFragment.appendChild(nextBtn);
  },

  renderWeighingList() {
    this.renderTable();
    this.renderColumns();
    this.renderRows();
  },

  renderTable() {
    const table = document.createElement('table');
    table.id = 'weighing-list-table';
    table.classList.add('table', 'table-bordered', 'table-hover');

    const thead = document.createElement('thead');
    thead.id = 'weighing-list-thead';

    const tbody = document.createElement('tbody');
    tbody.id = 'weighing-list-tbody';

    table.appendChild(thead);
    table.appendChild(tbody);
    state.docFragment.appendChild(table);
  },

  renderColumns() {
    const columns = state.weighingList.definition.columns;
    if (!columns) { return; }

    this.sort(columns);

    const thead = state.docFragment.querySelector('#weighing-list-thead');
    const tr = document.createElement('tr');

    this.renderDocumentColumn(tr);

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const th = document.createElement('th');
      th.innerText = column.displayText;
      if (column.dataType === WeighingListDataType.Date) {
        th.classList.add('th-date');
      }

      tr.appendChild(th);
    }

    thead.appendChild(tr);
  },

  renderDocumentColumn(tableRow) {
    const th = document.createElement('th');
    th.innerText = 'Dokumenter';
    th.classList.add('th-document');
    tableRow.appendChild(th);
  },

  renderRows() {
    const records = state.weighingList.records;
    if (!records) { return; }

    const tbody = state.docFragment.querySelector('#weighing-list-tbody');

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
      td.addEventListener('click', this.toggleShowDocuments)
      td.ids = {
        parentRowId: tableRow.id,
        documentRowId: `doc-tr-${record.id}`,
        iconId: `doc-icon-${record.id}`
      };

      const li = document.createElement('li');
      li.classList.add('fa', 'fa-chevron-right');
      li.id = td.ids.iconId;
      li.ids = td.ids;

      label.ids = td.ids;
      td.appendChild(li);
    }

    td.appendChild(label);
    tableRow.appendChild(td);
  },

  toggleShowDocuments(event) {
    const element = event.target;
    const parentRow = document.querySelector(`#${element.ids.parentRowId}`)
    const documentRow = document.querySelector(`#${element.ids.documentRowId}`)
    const icon = document.querySelector(`#${element.ids.iconId}`)

    icon.classList = [];

    if (documentRow.style.display === 'none') {
      icon.classList.add('fa', 'fa-chevron-down');
      documentRow.style.display = ''
      parentRow.style.backgroundColor = 'rgb(203, 203, 203)';
    } else {
      icon.classList.add('fa', 'fa-chevron-right');
      documentRow.style.display = 'none'
      parentRow.style.backgroundColor = '';
    }
  },

  renderDocuments(record) {
    if (!record.documents) { return; }

    const tr = document.createElement('tr');
    tr.id = `doc-tr-${record.id}`;
    tr.classList.add('tr-no-hover');
    tr.style.display = 'none';

    const td = document.createElement('td');
    td.colSpan = this.getWeighingListColumnCount();

    const ul = document.createElement('ul');
    ul.classList.add('ul-document')

    tr.appendChild(td);
    td.appendChild(ul);

    for (let i = 0; i < record.documents.length; i++) {
      const attachedDocument = record.documents[i];

      const li = document.createElement('li');
      li.classList.add('li-document')

      const a = document.createElement('a');
      a.innerText = attachedDocument.name;
      a.href = '#';

      li.appendChild(this.getFileExtensionIcon(attachedDocument));
      li.appendChild(a);
      ul.appendChild(li);
    }

    state.docFragment.querySelector('#weighing-list-tbody').appendChild(tr);
  },

  getFileExtensionIcon(attachedDocument) {
    const li = document.createElement('li');
    li.classList.add('fa', 'document-icon')

    switch (attachedDocument.dataType) {
      case FileExtension.xlsx:
        li.classList.add('fa-file-excel-o', 'color-green');
        break;
      case FileExtension.pdf:
        li.classList.add('fa-file-pdf-o', 'color-red');
        break;
    }

    return li;
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
    const columns = state.weighingList.definition.columns;

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];

      if (navColumnId === column.navColumnId) {
        return column;
      }
    }
  },

  getWeighingListColumnCount() {
    return state.docFragment.querySelector('#weighing-list-thead').firstChild.childNodes.length;
  },

  clearTable() {
    const tbody = document.querySelector('#weighing-list-tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  },

  prev() {
    component.clearTable();
    state.docFragment = component.getDocumentFragment('#weighing-list');
    component.renderRows();

    const tbody = state.docFragment.querySelector('#weighing-list-tbody');
    document.querySelector('#weighing-list-tbody').replaceWith(tbody);
  },

  next() {
    component.clearTable();
    state.docFragment = component.getDocumentFragment('#weighing-list');
    component.renderRows();

    const tbody = state.docFragment.querySelector('#weighing-list-tbody');
    document.querySelector('#weighing-list-tbody').replaceWith(tbody);
  },

  getDocumentFragment(elementId) {
    const docFragment = new DocumentFragment();
    const element = document.querySelector(elementId);
    docFragment.appendChild(element.cloneNode(true));
    return docFragment;
  },
}