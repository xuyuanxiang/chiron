<template>
  <h1 :class="$style.app">Hello, Vue</h1>
</template>
<script>
export default {
  mounted() {
    console.warn('vue mounted');
  },
  destroyed() {
    console.warn('vue destroyed');
  },
};
</script>
<style lang="less" module>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
