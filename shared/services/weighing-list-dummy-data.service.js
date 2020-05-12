import { WeighingListDefinition } from '../models/weighing-list-definition.model.js';
import { WeighingList } from '../models/weighing-list.model.js';
import { ColumnDefinition } from '../models/column-definition.model.js';
import { ColumnValue } from '../models/column-value.model.js';
import { WeighingListDataType } from '../enums/weighing-list-data-type.enum.js';
import { WeighingListRecord } from '../models/weighing-list-record.model.js';
import { AttachedDocument } from '../models/attached-document.model.js';
import { FileExtension } from '../enums/file-extension.enum.js';

export const WeighingListDummyDataService = {

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
    const record = new WeighingListRecord();
    record.values = this.getColumnValues();
    record.documents = this.getDocuments();

    const records = [record];

    return records;
  },

  getColumnValues() {
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

    return [columnValue2, columnValue4, columnValue3, columnValue1];
  },

  getDocuments() {
    const document1 = new AttachedDocument();
    document1.name = 'Aktivitetsliste.pdf';
    document1.dataType = FileExtension.pdf;

    const document2 = new AttachedDocument();
    document2.name = 'Aktivitetsliste.xlsx';
    document2.dataType = FileExtension.xlsx;
  }
}



