import { WeighingListDummyDataService } from './weighing-list-dummy-data.service.js';
import { HttpService } from './http.service.js';

export const WeighingListService = {

  getDummyList() {
    return WeighingListDummyDataService.getWeighingList();
  },

  getConfig() {
    return HttpService.get(EVITA.Urls.WeighingListConfig);
  },

  getData() {
    return HttpService.get(EVITA.Urls.WeighingListData);
  },

  getDocument() {
    return HttpService.get(EVITA.Urls.WeighingListDocument);
  }
}
