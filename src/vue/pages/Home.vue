<template>
  <div id="home">
    <template v-if="pageIsLoaded">
      <template v-if="existingDbs.length > 0">
        <div id="db-sort-bar" @click="handleDbSort">
          <div id="db-sort-bar-header">Sort by:</div>
          <div class="db-sort-option db-sort-option-selected">Name</div>
          <div class="db-sort-option">Date created</div>
          <div class="db-sort-option">Last modified</div>
        </div>
        <DbListBox
          v-for="db of existingDbs"
          :key="db.id"
          :fileName="db.fileName"
          :createdOn="db.createdOn"
          :lastModifiedOn="db.lastModifiedOn"
          v-on:deleted="handleDeletedDb"
        />
        <div class="create-new-db-box">
          <router-link to="/create-new-db">Create new database</router-link>
        </div>
      </template>
      <template v-else>
        <div class="create-new-db-box">
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
import { DatabaseInfo } from '@/common/types';
import DbListBox from '../components/DbListBox.vue';

@Component({ components: { DbListBox } })
export default class Home extends Vue {
  existingDbs: DatabaseInfo[] = [];
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
      })
      .catch((err) => console.error(err));
  }

  /**
   * Handle sorting of database list, triggered by click event on sort bar.
   */
  handleDbSort(e: MouseEvent) {
    const targ = e.target as HTMLElement;

    if (
      !targ.classList.contains('db-sort-option') ||
      targ.classList.contains('db-sort-option-selected')
    ) {
      return;
    }

    if (/name/i.test(targ.textContent as string)) {
      this.existingDbs = this.existingDbs.sort((a, b) =>
        a.fileName.localeCompare(b.fileName)
      );
    } else if (/created/i.test(targ.textContent as string)) {
      this.existingDbs = this.existingDbs.sort(
        (a, b) => +new Date(a.createdOn) - +new Date(b.createdOn)
      );
    } else if (/modified/i.test(targ.textContent as string)) {
      this.existingDbs = this.existingDbs.sort(
        (a, b) => +new Date(a.lastModifiedOn) - +new Date(b.lastModifiedOn)
      );
    }

    (targ.parentElement as HTMLElement)
      .querySelectorAll('.db-sort-option-selected')
      .forEach((el) => el.classList.remove('db-sort-option-selected'));

    targ.classList.add('db-sort-option-selected');
  }

  /**
   * Update this page's database list property, removing a database from it that
   * has been deleted in a child component.
   */
  handleDeletedDb(value: string) {
    this.existingDbs = this.existingDbs.filter((db) => db.fileName !== value);
  }
}
</script>

<style lang="scss" scoped>
#home {
  #db-sort-bar {
    align-items: center;
    display: flex;
    justify-content: flex-start;

    & > * {
      padding: 8px 10px;
      text-align: center;
    }

    #db-sort-bar-header {
      font-weight: bold;
    }

    .db-sort-option {
      cursor: pointer;
      user-select: none;
    }

    .db-sort-option-selected {
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
    }
  }

  .create-new-db-box {
    font-size: 120%;
    margin: 10px 0px;
    text-align: center;
  }

  #loading-box {
    text-align: center;
  }
}
</style>
