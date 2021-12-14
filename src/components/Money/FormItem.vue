/* eslint-disable */
<template>
  <div>
    <label class="formItem">
      <span class="remakes">{{ this.fieldName }}</span>
      <input type="text" :value="value" @input="onValueChanged($event.target.value)" :placeholder="placeholder"/>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
  @Prop({default:''}) readonly value!: string;

  @Prop({required: true}) fieldName!:string;
  @Prop() placeholder?:string;


  onValueChanged(value:string){
    this.$emit('update:value',value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  display: flex;
  align-items: center;

  > .remakes {
    padding: 0 16px;
  }

  > input {
    flex-grow: 1;
    height: 40px;
    border: none;
    background: transparent;
  }
}
</style>