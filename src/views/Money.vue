<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="addRecord"/>
    <Types :type="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :tags.sync="record.tags" :data-source.sync="tags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';

const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');

type Record = {
  tags: string[],
  notes: string,
  type: string,
  amount: number,
  createdAt?: Date
}

@Component({components: {NumberPad, Types, Notes, Tags}})
export default class Money extends Vue {
  tags = ['买衣服', '吃饭', '房租', '交通费用'];
  recordList : Record[] = recordList;
  record: Record = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateNotes(value: string) {
    this.record.notes=value;
  }
  addRecord(){
    const deepClone : Record = JSON.parse(JSON.stringify((this.record)));
    deepClone.createdAt = new Date();
    this.recordList.push(deepClone);
  }

  @Watch('recordList')
  onRecordListchanged(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>
