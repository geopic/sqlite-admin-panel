<template>
  <div id="app">
    <header>
      <h1 id="site-title">
        <router-link to="/">{{ siteName }}</router-link>
      </h1>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <a
        id="github-repo-link"
        href="https://github.com/geopic/sqlite-admin-panel"
      >
        GitHub repo</a
      >
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';

@Component
export default class App extends Vue {
  siteName = props.site.name;

  created() {
    document.title = this.siteName;
  }
}
</script>

<style lang="scss">
@import './globals.scss';

#app {
  display: grid;
  grid-template-rows: 50px auto 40px;
  height: 100vh;

  & > * {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }

  header {
    background-color: #8484ff;

    #site-title {
      a {
        border-bottom: 2px dotted transparent;
        color: inherit;
        padding: 3px 10px;
        text-decoration: none;

        &:hover,
        &:active {
          border-bottom-color: white;
          color: white;
        }
      }
    }
  }

  main {
    align-items: start;
    padding: 10px;

    & > * {
      width: 100%;
    }
  }

  footer {
    font-size: 95%;
  }

  @media all and (min-width: $medquery-min-width-02) {
    grid-template-rows: 70px auto 40px;
  }
}
</style>
