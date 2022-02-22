type RootStater = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?:Tag
}
type RecordItem = {
  tags: Tag[],
  notes: string,
  type: string,
  amount: number,
  createdAt?: string
}
type Tag = {
  id:string
  name:string
}
// type TagListModel = {
//   data:Tag[]
//   fetch:()=>Tag[]
//   create:(name:string)=> 'success' | 'duplicated'
//   update:(id:string,name:string)=>'success' | 'not found label' | 'duplicated label'
//   remove:(id:string)=>'success' | 'remove fail'
//   save:()=>void
// }

// interface Window {
//   store: {
//   tagList: Tag[];
//   findTag:(id:string)=>Tag | undefined;
//   createTag: (name:string)=>void;
//   removeTag: (id:string)=>'success' | 'remove fail';
//   //updateTag:TagListModel['update'] 等于
//   updateTag: (id:string,name:string)=>'success' | 'not found label' | 'duplicated label';
//   recordList:RecordItem[];
//   createRecord:(record:RecordItem)=>void
// }

// }