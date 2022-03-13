import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';
import createId from '@/lib/createId';
import clone from '@/lib/clone';

Vue.use(Vuex)



 const store = new Vuex.Store({
  state: {
    recordList:[],
    tagList:[],
    currentTag: undefined
  } as RootStater,
  mutations: {
    setCurrentTag(state,id:string){
      state.currentTag = state.tagList.filter(t=>t.id===id)[0];
    },
    updateTag(state,payload:{id:string,name:string}){
      const {id,name}=payload;
      const idList = state.tagList.map(item=>item.id);
      if(idList.indexOf(id)>=0){
        const names = state.tagList.map(item=>item.id);
        if(names.indexOf(name)>=0){
          window.alert('标签名重复了');
        }else{
          const tag = state.tagList.filter(item=>item.id===id)[0];
          tag.name = name;
          store.commit('saveTags')
        }
      }
    },
    removeTag(state,id:string){
      let index=-1;
      for(let i=0;i<state.tagList.length;i++){
        if(state.tagList[i].id===id){
          index=i;
          break;
        }
      }
      if(index>=0){
        state.tagList.splice(index,1);
        store.commit('saveTags');
        window.alert('删除成功！')
        router.back();
      }else{
        window.alert('删除失败！');
      }
    },
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList')||'[]');
    },
    createRecord(state,record){
      const record2:RecordItem = clone(record);
      if(record2.amount<=0) {window.alert('请输入大于0的金额');return;}
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
      window.alert('添加新账单成功^_^!')

    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList));
    },
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList')||'[]');
    },
    createTag(state,name:string){
      const names = state.tagList.map(item=>item.name);
      if(names.indexOf(name)>=0){
        window.alert('标签名重复了！');
        return;
      }else{
        const id = createId().toString();
        state.tagList.push({id,name});
        store.commit('saveTags');
        window.alert('添加成功！');
      }

    },
    saveTags(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList));
    }
  },
  actions: {
  },
  modules: {
  }
})


export default store;