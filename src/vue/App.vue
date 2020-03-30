<template>
  <div id="app">
    <header>
      <div id="site-title">{{ title }}</div>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <a id="github-repo-link" href="https://github.com/geopic/sqlite-admin-panel">GitHub repo</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';

@Component
export default class App extends Vue {
  created() {
    document.title = props.site.name;
  }
}
</script>

<style lang="scss"></style>
