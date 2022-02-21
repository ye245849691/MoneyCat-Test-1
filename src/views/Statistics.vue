<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type='-';
  recordTypeList=recordTypeList;

};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
::v-deep .type-tabs-item{
  background: #c4c4c4;
  &.selected{
    color: $color-highlight;
    background: $background-highlight;
    &::after{
      display: none;
    }
  }
}
</style>