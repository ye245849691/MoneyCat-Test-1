<template>
  <div>
    <label class="notes">
      <span class="remakes">备注</span>
      <input type="text" placeholder="请在这里输入备注"/>
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Notes'
};
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