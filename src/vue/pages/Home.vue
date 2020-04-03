<template>
  <div id="home">
    <template v-if="pageIsLoaded">
      <template v-if="databasesExist">
        <DbListBox
          v-for="db of existingDbs"
          :key="existingDbs.indexOf(db)"
          :fileName="db.fileName"
          :createdOn="db.createdOn"
          :lastModifiedOn="db.lastModifiedOn"
        />
      </template>
      <template v-else>
        <div>
          No database exists. To create one, please navigate to the
          <router-link to="/create-new-db">create new database</router-link>
          page.
        </div>
      </template>
    </template>
    <template v-else><div id="loading-box">Loading...</div></template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';
import DbListBox from '../components/DbListBox.vue';

@Component({ components: { DbListBox } })
export default class Home extends Vue {
  existingDbs: string[] = [];
  databasesExist = false;
  pageIsLoaded = false;

  created() {
    fetch(`${props.site.serverHost}/database`)
      .then((res) => res.json())
      .then((files) => {
        this.pageIsLoaded = true;
        if (files.length === 0) {
          return;
        }
        this.existingDbs = files;
        this.databasesExist = true;
      })
      .catch((err) => console.error(err));
  }
}
</script>

<style lang="scss" scoped>
#home {
  #loading-box {
    text-align: center;
  }
}
</style>
