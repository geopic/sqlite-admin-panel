<template>
  <div id="view-db">
    <h2 id="db-name">{{ this.$route.params.dbName }}</h2>
    <div id="db-tables">TODO: table display</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';

@Component
export default class ViewDb extends Vue {
  database = null;

  created() {
    if (!this.$route.params.dbName) {
      this.$router.replace({ name: 'home' });
      return;
    }
    fetch(`${props.site.serverHost}/database/${this.$route.params.dbName}`)
      .then((res) => res.json())
      .then((dbData) => {
        // TODO: Develop functionality when db with tables is received
        console.log(dbData);
      })
      .catch((err) => console.error(err));
  }
}
</script>

<style lang="scss" scoped></style>
