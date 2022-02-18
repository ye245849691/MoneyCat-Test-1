import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel1';
import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
  ...recordStore,
  ...tagStore,


};
export default store;