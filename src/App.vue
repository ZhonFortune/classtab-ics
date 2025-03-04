<script setup lang="js">
import Aside from './components/aside.vue';
import pagehead from './components/pagehead.vue';
</script>

<template>
    <Aside />
    <div class="right">
      <pagehead />
      <div id="content">
        <RouterView />
      </div>
    </div>
</template>

<style scoped>
.right {
  height: 100%; width: 100%;
  display: grid; flex-direction: column;
  align-content: space-between;
  grid-template-rows: 0fr 1fr;
}
</style>
