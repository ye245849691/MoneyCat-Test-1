<template>
  <div>
    <label class="notes">
      <span class="remakes">备注</span>
      <input type="text" v-model="value" placeholder="请在这里输入备注"/>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue{
  value='';
  @Watch('value')
  onValueChanged(value:string){
    this.$emit('update:value',value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  display: flex;
  background: #f5f5f5;
  align-items: center;

  > .remakes {
    padding: 0 16px;
  }

  > input {
    flex-grow: 1;
    height: 64px;
    border: none;
    background: transparent;
  }
}
</style>