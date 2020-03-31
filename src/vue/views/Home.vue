<template>
  <div class="home">
    <template v-if="databaseExists">
      <div>Database exists, welcome to home page.</div>
    </template>
    <template v-else>
      <div>
        No database exists. To create one, please navigate to the
        <router-link to="/create-new-db">create new database</router-link> page.
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  databaseExists = false;
}
</script>
