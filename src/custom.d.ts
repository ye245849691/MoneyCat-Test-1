type RecordItem = {
  tags: string[],
  notes: string,
  type: string,
  amount: number,
  createdAt?: Date
}
type Tag = {
  id:string
  name:string
}
type TagListModel = {
  data:Tag[]
  fetch:()=>Tag[]
  create:(name:string)=> 'success' | 'duplicated'
  update:(id:string,name:string)=>'success' | 'not found label' | 'duplicated label'
  remove:(id:string)=>'success' | 'remove fail'
  save:()=>void
}

interface Window {
  tagList: Tag[]
}