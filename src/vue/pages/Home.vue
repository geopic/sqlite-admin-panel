<template>
  <div id="home">
    <template v-if="pageIsLoaded">
      <template v-if="existingDbs.length > 0">
        <div id="db-sort-bar" @click="handleDbListState">
          <div id="db-sort-bar-header">
            Sort by:
          </div>
          <div class="db-sort-option db-sort-option-selected">Name</div>
          <div class="db-sort-option">Date created</div>
          <div class="db-sort-option">Date modified</div>
          <div id="db-sort-bar-order" @click="handleDbSortOrder">
            {{ ascDescText }}
          </div>
        </div>
        <DbListBox
          v-for="db of existingDbs"
          :key="db.uuid"
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

  // 0 = 'name', 1 = 'date created', 2 = 'date modified'
  sortState = {
    state: 0,
    ascending: false
  };

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

  get ascDescText() {
    return this.sortState.ascending ? 'asc' : 'desc';
  }

  /**
   * Handle sorting of database list by changing state, triggered by click event
   * on sort bar.
   */
  handleDbListState(e: MouseEvent) {
    const targ = e.target as HTMLElement;

    if (!targ.classList.contains('db-sort-option')) {
      return;
    }

    if (/name/i.test(targ.textContent as string)) {
      this.sortState.state = 0;
    } else if (/created/i.test(targ.textContent as string)) {
      this.sortState.state = 1;
    } else if (/modified/i.test(targ.textContent as string)) {
      this.sortState.state = 2;
    }

    this.sortDbList();

    (targ.parentElement as HTMLElement)
      .querySelectorAll('.db-sort-option-selected')
      .forEach((el) => el.classList.remove('db-sort-option-selected'));

    targ.classList.add('db-sort-option-selected');
  }

  sortDbList() {
    /* eslint-disable indent */
    switch (this.sortState.state) {
      case 0:
        this.existingDbs = this.existingDbs.sort((a, b) => {
          return this.sortState.ascending
            ? b.fileName.localeCompare(a.fileName)
            : a.fileName.localeCompare(b.fileName);
        });
        break;
      case 1:
        this.existingDbs = this.existingDbs.sort((a, b) => {
          return this.sortState.ascending
            ? +new Date(a.createdOn) + +new Date(b.createdOn)
            : +new Date(a.createdOn) - +new Date(b.createdOn);
        });
        break;
      case 2:
        this.existingDbs = this.existingDbs.sort((a, b) => {
          return this.sortState.ascending
            ? +new Date(a.lastModifiedOn) + +new Date(b.lastModifiedOn)
            : +new Date(a.lastModifiedOn) - +new Date(b.lastModifiedOn);
        });
        break;
    }
  }

  /**
   * Toggle sort order (ascending, descending).
   */
  handleDbSortOrder() {
    this.sortState.ascending = !this.sortState.ascending;
    this.sortDbList();
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

    #db-sort-bar-order {
      cursor: pointer;
      font-weight: bold;
      width: 40px;
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
