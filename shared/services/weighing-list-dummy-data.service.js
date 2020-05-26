import { WeighingListDefinition } from '../models/weighing-list-definition.model.js';
import { WeighingList } from '../models/weighing-list.model.js';
import { ColumnDefinition } from '../models/column-definition.model.js';
import { ColumnValue } from '../models/column-value.model.js';
import { WeighingListDataType } from '../enums/weighing-list-data-type.enum.js';
import { WeighingListRecord } from '../models/weighing-list-record.model.js';
import { AttachedDocument } from '../models/attached-document.model.js';
import { FileExtension } from '../enums/file-extension.enum.js';
import { WeighingListFilterItem } from '../models/weighing-list-filter-item.model.js';
import { FilterOption } from '../models/filter-option.model.js';

export const WeighingListDummyDataService = {

    getWeighingList() {
        // const weighingList = this.getTestData();
        const weighingList = new WeighingList();
        weighingList.definition = this.getWeighingListDefinition();
        weighingList.records = this.getRecords();
        weighingList.totalCount = 21;
        return weighingList;
    },

    getWeighingListDefinition() {
        const weighingListDefinition = new WeighingListDefinition()
        weighingListDefinition.filters = this.getFilters();
        weighingListDefinition.columns = this.getColumns();
        return weighingListDefinition;
    },

    getFilters() {
        const filter = new WeighingListFilterItem();
        filter.dataType = WeighingListDataType.String;
        filter.displayText = 'Ordrenummer';
        filter.helpText = 'Nummeret på ordren';
        
        const filter2 = new WeighingListFilterItem();
        filter2.dataType = WeighingListDataType.Bool;
        filter2.displayText = 'Afkrydsningsboks';
        filter2.helpText = 'En afkrydsningsboks';
        
        const filter5 = new WeighingListFilterItem();
        filter5.dataType = WeighingListDataType.Bool;
        filter5.displayText = 'En afkrydsningsboks mere';
        filter5.helpText = 'En afkrydsningsboks igen';
        
        const filter3 = new WeighingListFilterItem();
        filter3.dataType = WeighingListDataType.Dropdown;
        filter3.displayText = 'Debitor';
        filter3.helpText = 'Vælg en debitor';
        filter3.options = this.getFilterOptions();
        
        const filter4 = new WeighingListFilterItem();
        filter4.dataType = WeighingListDataType.Date;
        filter4.displayText = 'Fra dato';
        filter4.helpText = 'Angiv en "Fra dato"';
        filter4.value = '20-05-2020';

        return [filter, filter2, filter3, filter4, filter5];
    },

    getFilterOptions() {
        const option = new FilterOption();
        option.text = 'Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum';
        option.value = 'Carsten';
        
        const option2 = new FilterOption();
        option2.text = 'Peter';
        option2.value = 'Peter';
        
        const option3 = new FilterOption();
        option3.text = 'Morten';
        option3.value = 'Morten';

        return [option, option2, option3];
    },

    getColumns() {
        const column1 = new ColumnDefinition()
        column1.navColumnId = 1;
        column1.displayText = 'Dato';
        column1.dataType = WeighingListDataType.Date;
        column1.sortOrder = 1;

        const column2 = new ColumnDefinition()
        column2.navColumnId = 2;
        column2.displayText = 'Nummer';
        column2.dataType = WeighingListDataType.String;
        column2.sortOrder = 2;

        const column3 = new ColumnDefinition()
        column3.navColumnId = 3;
        column3.displayText = 'Kommune';
        column3.dataType = WeighingListDataType.String;
        column3.sortOrder = 3;

        const column4 = new ColumnDefinition()
        column4.navColumnId = 4;
        column4.displayText = 'Container';
        column4.dataType = WeighingListDataType.String;
        column4.sortOrder = 4;

        const column5 = new ColumnDefinition()
        column5.navColumnId = 5;
        column5.displayText = 'Vogn';
        column5.dataType = WeighingListDataType.String;
        column5.sortOrder = 5;

        const column6 = new ColumnDefinition()
        column6.navColumnId = 6;
        column6.displayText = 'Ordre';
        column6.dataType = WeighingListDataType.String;
        column6.sortOrder = 6;

        const column7 = new ColumnDefinition()
        column7.navColumnId = 7;
        column7.displayText = 'Vare';
        column7.dataType = WeighingListDataType.String;
        column7.sortOrder = 7;

        const column8 = new ColumnDefinition()
        column8.navColumnId = 8;
        column8.displayText = 'EAK';
        column8.dataType = WeighingListDataType.String;
        column8.sortOrder = 8;

        const column9 = new ColumnDefinition()
        column9.navColumnId = 9;
        column9.displayText = 'Vægt';
        column9.dataType = WeighingListDataType.String;
        column9.sortOrder = 9;

        const column11 = new ColumnDefinition()
        column11.navColumnId = 11;
        column11.displayText = 'Gebyr';
        column11.dataType = WeighingListDataType.String;
        column11.sortOrder = 11;

        const column12 = new ColumnDefinition()
        column12.navColumnId = 12;
        column12.displayText = 'Beløb';
        column12.dataType = WeighingListDataType.String;
        column12.sortOrder = 12;

        return [
            column2,
            column3,
            column4,
            column1,
            column8,
            column5,
            column12,
            column9,
            column6,
            column11,
            column7,
        ];
    },

    getRecords() {
        const record = new WeighingListRecord();
        record.values = this.getColumnValues();
        record.documents = this.getDocuments();
        record.id = 1;

        const record2 = new WeighingListRecord();
        record2.values = this.getColumnValues();
        // record2.documents = this.getDocuments();
        record2.id = 2;

        const records = [record, record2];

        return records;
    },

    getColumnValues() {
        const columnValue1 = new ColumnValue();
        columnValue1.navColumnId = 1;
        columnValue1.value = '14-05-2019';

        const columnValue2 = new ColumnValue();
        columnValue2.navColumnId = 2;
        columnValue2.value = 'B000113';

        const columnValue3 = new ColumnValue();
        columnValue3.navColumnId = 3;
        columnValue3.value = 'Favrskov';

        const columnValue4 = new ColumnValue();
        columnValue4.navColumnId = 4;
        columnValue4.value = 'IMK2';

        const columnValue5 = new ColumnValue();
        columnValue5.navColumnId = 5;
        columnValue5.value = '92';

        const columnValue6 = new ColumnValue();
        columnValue6.navColumnId = 6;
        columnValue6.value = '58';

        const columnValue7 = new ColumnValue();
        columnValue7.navColumnId = 7;
        columnValue7.value = 'Farligt affald indvejningsnummer';

        const columnValue8 = new ColumnValue();
        columnValue8.navColumnId = 8;
        columnValue8.value = 'Glas, plast og træ, som indeholder eller er forurenet med farlige stoffer';

        const columnValue9 = new ColumnValue();
        columnValue9.navColumnId = 9;
        columnValue9.value = '13.000';

        const columnValue11 = new ColumnValue();
        columnValue11.navColumnId = 11;
        columnValue11.value = '48,00';

        const columnValue12 = new ColumnValue();
        columnValue12.navColumnId = 12;
        columnValue12.value = '3.048,00';

        return [
            columnValue2,
            columnValue4,
            columnValue3,
            columnValue1,
            columnValue7,
            columnValue6,
            columnValue8,
            columnValue5,
            columnValue9,
            columnValue12,
            columnValue11,
        ];
    },

    getDocuments() {
        const document1 = new AttachedDocument();
        document1.name = 'Aktivitetsliste.pdf';
        document1.dataType = FileExtension.pdf;

        const document2 = new AttachedDocument();
        document2.name = 'Aktivitetsliste.xlsx';
        document2.dataType = FileExtension.xlsx;

        return [document1, document2];
    },

    getTestData() {
        return {
          "definition": {
            "filters": [
              {
                "dataType": 1,
                "helpText": "Nummeret på ordren",
                "displayText": "Ordrenummer"
              },
              {
                "dataType": 3,
                "helpText": "En afkrydsningsboks",
                "displayText": "Afkrydsningsboks"
              },
              {
                "dataType": 4,
                "helpText": "Vælg en debitor",
                "displayText": "Debitor",
                "options": [
                  {
                    "value": "Carsten",
                    "text": "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
                  },
                  {
                    "value": "Peter",
                    "text": "Peter"
                  },
                  {
                    "value": "Morten",
                    "text": "Morten"
                  }
                ]
              },
              {
                "dataType": 2,
                "value": "20-05-2020",
                "helpText": "Angiv en dato",
                "displayText": "Fra dato"
              },
              {
                "dataType": 3,
                "helpText": "En afkrydsningsboks igen",
                "displayText": "En afkrydsningsboks mere"
              }
            ],
            "columns": [
              {
                "navColumnId": 1,
                "displayText": "Dato",
                "dataType": 2,
                "sortOrder": 1
              },
              {
                "navColumnId": 2,
                "displayText": "Nummer",
                "dataType": 1,
                "sortOrder": 2
              },
              {
                "navColumnId": 3,
                "displayText": "Kommune",
                "dataType": 1,
                "sortOrder": 3
              },
              {
                "navColumnId": 4,
                "displayText": "Container",
                "dataType": 1,
                "sortOrder": 4
              },
              {
                "navColumnId": 5,
                "displayText": "Vogn",
                "dataType": 1,
                "sortOrder": 5
              },
              {
                "navColumnId": 6,
                "displayText": "Ordre",
                "dataType": 1,
                "sortOrder": 6
              },
              {
                "navColumnId": 7,
                "displayText": "Vare",
                "dataType": 1,
                "sortOrder": 7
              },
              {
                "navColumnId": 8,
                "displayText": "EAK",
                "dataType": 1,
                "sortOrder": 8
              },
              {
                "navColumnId": 9,
                "displayText": "Vægt",
                "dataType": 1,
                "sortOrder": 9
              },
              {
                "navColumnId": 11,
                "displayText": "Gebyr",
                "dataType": 1,
                "sortOrder": 11
              },
              {
                "navColumnId": 12,
                "displayText": "Beløb",
                "dataType": 1,
                "sortOrder": 12
              }
            ]
          },
          "records": [
            {
              "values": [
                {
                  "navColumnId": 1,
                  "value": "14-05-2019",
                  "dataType": 2,
                  "sortOrder": 1
                },
                {
                  "navColumnId": 2,
                  "value": "B000113",
                  "dataType": 1,
                  "sortOrder": 2
                },
                {
                  "navColumnId": 3,
                  "value": "Favrskov",
                  "dataType": 1,
                  "sortOrder": 3
                },
                {
                  "navColumnId": 4,
                  "value": "IMK2",
                  "dataType": 1,
                  "sortOrder": 4
                },
                {
                  "navColumnId": 5,
                  "value": "92",
                  "dataType": 1,
                  "sortOrder": 5
                },
                {
                  "navColumnId": 6,
                  "value": "58",
                  "dataType": 1,
                  "sortOrder": 6
                },
                {
                  "navColumnId": 7,
                  "value": "Farligt affald indvejningsnummer",
                  "dataType": 1,
                  "sortOrder": 7
                },
                {
                  "navColumnId": 8,
                  "value": "Glas, plast og træ, som indeholder eller er forurenet med farlige stoffer",
                  "dataType": 1,
                  "sortOrder": 8
                },
                {
                  "navColumnId": 9,
                  "value": "13.000",
                  "dataType": 1,
                  "sortOrder": 9
                },
                {
                  "navColumnId": 11,
                  "value": "48,00",
                  "dataType": 1,
                  "sortOrder": 11
                },
                {
                  "navColumnId": 12,
                  "value": "3.048,00",
                  "dataType": 1,
                  "sortOrder": 12
                }
              ],
              "documents": [
                {
                  "name": "Aktivitetsliste.pdf",
                  "dataType": 1
                },
                {
                  "name": "Aktivitetsliste.xlsx",
                  "dataType": 2
                }
              ],
              "id": 1
            },
            {
              "values": [
                {
                  "navColumnId": 1,
                  "value": "14-05-2019",
                  "dataType": 2,
                  "sortOrder": 1
                },
                {
                  "navColumnId": 2,
                  "value": "B000113",
                  "dataType": 1,
                  "sortOrder": 2
                },
                {
                  "navColumnId": 3,
                  "value": "Favrskov",
                  "dataType": 1,
                  "sortOrder": 3
                },
                {
                  "navColumnId": 4,
                  "value": "IMK2",
                  "dataType": 1,
                  "sortOrder": 4
                },
                {
                  "navColumnId": 5,
                  "value": "92",
                  "dataType": 1,
                  "sortOrder": 5
                },
                {
                  "navColumnId": 6,
                  "value": "58",
                  "dataType": 1,
                  "sortOrder": 6
                },
                {
                  "navColumnId": 7,
                  "value": "Farligt affald indvejningsnummer",
                  "dataType": 1,
                  "sortOrder": 7
                },
                {
                  "navColumnId": 8,
                  "value": "Glas, plast og træ, som indeholder eller er forurenet med farlige stoffer",
                  "dataType": 1,
                  "sortOrder": 8
                },
                {
                  "navColumnId": 9,
                  "value": "13.000",
                  "dataType": 1,
                  "sortOrder": 9
                },
                {
                  "navColumnId": 11,
                  "value": "48,00",
                  "dataType": 1,
                  "sortOrder": 11
                },
                {
                  "navColumnId": 12,
                  "value": "3.048,00",
                  "dataType": 1,
                  "sortOrder": 12
                }
              ],
              "id": 2
            }
          ],
          "totalCount": 21
        }
    }
}



