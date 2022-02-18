import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  //record store
  recordList: [] as RecordItem[],
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.recordList));
  },

  createRecord(record: RecordItem){
    const deepClone = clone(record);
    deepClone.createdAt = new Date();
    this.recordList && this.recordList.push(deepClone);
    recordStore.saveRecords();
  },
}
recordStore.fetchRecords();

export default recordStore;