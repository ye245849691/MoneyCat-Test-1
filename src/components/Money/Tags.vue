<template>
  <div class="tags">
    <div class="addTag">
      <button>新增标签</button>
    </div>
    <div class="tagsLabel">
      <ul class="currentTags">
        <li>买衣服</li>
        <li>吃饭</li>
        <li>房租</li>
        <li>交通费用</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>
.tags {
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