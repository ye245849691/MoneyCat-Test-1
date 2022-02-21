<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link class="tag" v-for="tag in tags" :key="tag.id"
         :to="`/labels/edit/${tag.id}`"><span>{{ tag.name }}</span><Icon name="right"></Icon></router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag"> 新建标签</Button>
      </div>

    </Layout>
  </div>
</template>

<script lang="ts">

import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component({
  components: {Button}
})
export default class Labels extends mixins(TagHelper){
  get tags(){
    return this.$store.state.tagList;
  }

  beforeCreate(){
    this.$store.commit('fetchTags')
  }
}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  font-size: 16px;
  padding: 0 16px;
  height: 90%;
  overflow: auto;
  > .tag{
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    > svg{
      height: 18px;
      width: 18px;
      color: #666;
    }
  }
}
.createTag{
  background: #767676;
  color: white;
  border: none;
  border-radius:4px;
  min-height: 40px;
  padding: 0 16px;

  &-wrapper{
    display: flex;
    justify-content: center;
    margin-top: 5%
  }
}
</style>