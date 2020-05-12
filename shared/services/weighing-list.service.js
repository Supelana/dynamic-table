import { WeighingListDummyDataService } from './weighing-list-dummy-data.service.js';

export const WeighingListService = {

  getDummyList() {
    return WeighingListDummyDataService.getWeighingList();
  }
}
