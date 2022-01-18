import createId from '@/lib/createId';

const localStorageKeyName ='tagList';

const tagListModel: TagListModel = {
  data:[],
  fetch(){
    this.data =  JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name: string){
    const id = createId().toString();
    const names = this.data.map(item => item.name);
    if (names.indexOf(name)>=0){return 'duplicated'}
    this.data.push({id,name:name});
    this.save();
    return 'success';
  },
  update(id,name){
    const idList=this.data.map(item=>item.id);
    if(idList.indexOf(id)>=0){
      const names=this.data.map(item=>item.name);
      if(names.indexOf(name)>=0){
        return 'duplicated label'
      }else{
        const tag = this.data.filter(item=>item.id===id)[0]
        tag.name=name;
        this.save();
        return 'success';
      }
    }else{
      return 'not found label'
    }
  },
  remove(id:string){
    let index=-1;
    console.log(id);
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].id===id){
        index=i;
        break;
      }
    }
    if(index!==-1){
      this.data.splice(index,1);
      this.save();
      return 'success';
    }
    return 'remove fail';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data));
  }
};

export default tagListModel;