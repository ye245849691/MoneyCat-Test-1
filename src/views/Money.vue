<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="addRecord"/>
    <Types :type.sync="record.type"/>
    <div class="note">
      <FormItem fieldName="备注" placeholder="请在这里输入备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags :tags.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2';


@Component({
  components: {NumberPad, Types, FormItem, Tags},
  computed:{
    recordList(){
      return store.recordList;
    }
  }
})
export default class Money extends Vue {
  tags = store.tagList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  addRecord() {
    store.createRecord(this.record);
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
