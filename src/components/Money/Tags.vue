<template>
  <div class="tags">
    <div class="addTag">
      <button @click="createTag">新增标签</button>
    </div>
    <div class="tagsLabel">
      <ul class="currentTags">
        <li v-for="tag in tagList" :key="tag.id"
            :class="{selected : selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">{{tag.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper){

  // @Prop() readonly tags!: string[];
  selectedTags : string[]=[];

  get tagList(){
    return this.$store.state.tagList;
  }
  beforeCreate(){
    this.$store.commit('fetchTags');
  }

  toggle(tag: string){
    const index = this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1);
    }else{
      this.selectedTags.push(tag);
    }
    this.$emit('update:tags',this.selectedTags)
  }
  // addTag(){
  //   const name = window.prompt('请输入标签名');
  //   if(!name){return window.alert('标签名不能为空');}
  //   store.createTag(name);
  //     // if(this.dataSource){
  //     // this.$emit('update:dataSource',[...this.dataSource,name])
  //
  // }
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