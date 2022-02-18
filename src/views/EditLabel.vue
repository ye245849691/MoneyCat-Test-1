<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <Icon class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="update" field-name="标签名" placeholder="请输入标签名"></FormItem>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import store from '@/store/index2';
@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {

  tag?: {id:string,name:string}=undefined;
  created(){
    this.tag = store.findTag(this.$route.params.id);
    if(!this.tag){
      this.$router.replace('/404');
    }
  }
  update(name:string){
    if(this.tag){
      store.updateTag(this.tag.id,name);
    }

  }
  remove(){
    if(this.tag){
      if(store.removeTag(this.tag.id) === 'success'){
        this.$router.back();
      }
    }
  }
  goBack(){
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar{
  font-size: 16px;
  background: white;
  display: flex;
  padding: 12px 16px;
  justify-content: space-between;
  >.leftIcon{
    width: 24px;
    height: 24px;
  }
  >.title{

  }
  >.rightIcon{
    width: 24px;
    height: 24px;
  }
}
.form-wrapper{
  background: white;
  margin-top: 10px;
}
.button-wrapper{
  text-align: center;
  padding-top: 16px;
  margin-top: 28px;
}
</style>