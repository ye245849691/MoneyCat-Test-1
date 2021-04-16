<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :amount.sync="record.amount"/>
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
import {Component} from 'vue-property-decorator';

type Record = {
  tags: string[],
  notes: string,
  type: string,
  amount: number
}

@Component({components: {NumberPad, Types, Notes, Tags}})
export default class Money extends Vue {
  tags = ['买衣服', '吃饭', '房租', '交通费用'];
  record: Record = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateNotes(value: string) {
    this.record.notes=value;
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>
