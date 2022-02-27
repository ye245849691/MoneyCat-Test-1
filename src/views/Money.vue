<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="addRecord"/>
    <Tabs  :data-source="recordTypeList" :value.sync="record.type" :type.sync="record.type"/>
    <div class="note">
      <FormItem fieldName="备注" placeholder="请在这里输入备注" :value.sync="record.notes"/>
    </div>
    <Tags :tags.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {Tabs, NumberPad, FormItem, Tags}
})
export default class Money extends Vue {
  get recordList(){
    return this.$store.state.recordList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  created(){
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  addRecord() {
    this.$store.commit('createRecord',this.record);
    this.record.notes='';

  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.note {
  padding: 12px 0;
}
</style>
