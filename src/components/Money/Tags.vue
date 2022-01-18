<template>
  <div class="tags">
    <div class="addTag">
      <button @click="addTag">新增标签</button>
    </div>
    <div class="tagsLabel">
      <ul class="currentTags">
        <li v-for="tag in dataSource" :key="tag.id"
            :class="{selected : selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">{{tag.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel1';

@Component
export default class Tags extends Vue{
  @Prop() readonly dataSource: string[] | undefined;
  // @Prop() readonly tags!: string[];
  selectedTags : string[]=[];

  toggle(tag: string){
    const index = this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1);
    }else{
      this.selectedTags.push(tag);
    }
    this.$emit('update:tags',this.selectedTags)
  }
  addTag(){
    const name = window.prompt('请输入标签名');
    if(name===''){
      window.alert('标签名不能为空');
    }else if(name===null){
      return;
    }else {
      const res = tagListModel.create(name)
      if(res==='success'){
        window.alert('添加成功');
      }else if(res==='duplicated'){
        window.alert('已存在该标签名');
      }
      // if(this.dataSource){
      // this.$emit('update:dataSource',[...this.dataSource,name])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  overflow: auto;
  > .tagsLabel {
    overflow: auto;

    > .currentTags {
      display: flex;
      flex-wrap: wrap;
      > li {
        background: #d9d9d9;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        &.selected{
          color: $color-highlight;
          background: $background-highlight;
        }
      }
    }
  }

  > .addTag {
    padding-top: 16px;

    > button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>