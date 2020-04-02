<template>
  <div id="home">
    <template v-if="pageIsLoaded">
      <template v-if="databasesExist">
        <div
          class="database-box"
          v-for="db of existingDbs"
          :key="existingDbs.indexOf(db)"
        >
          <div class="database-box-name-stats">
            <div class="database-name">{{ db.fileName }}</div>
            <div
              class="database-created-on"
              :title="formatDateAlt(db.createdOn)"
            >
              (Created on {{ formatDate(db.createdOn) }})
            </div>
            <div
              class="database-modified-on"
              :title="formatDateAlt(db.lastModifiedOn)"
            >
              (Last modified on {{ formatDate(db.lastModifiedOn) }})
            </div>
          </div>

          <div class="database-box-options">
            <div class="option-view">View</div>
            <div class="option-delete">Delete</div>
          </div>
        </div>
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
import { format } from 'date-fns';
import props from '@/common/props';

@Component
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

  /**
   * Format date string into human-readable format.
   */
  formatDate(date: string): string {
    return format(new Date(date), 'HH:mm:s y-LL-dd');
  }

  /**
   * Longer date display, made visible on hover with title attribute.
   */
  formatDateAlt(date: string): string {
    return format(new Date(date), 'HH:mm:s EEEE do LLLL y');
  }
}
</script>

<style lang="scss" scoped>
#home {
  #loading-box {
    text-align: center;
  }

  .database-box {
    align-items: center;
    display: flex;
    justify-content: space-evenly;

    .database-box-name-stats {
      display: grid;
      grid-template-areas:
        '. name .'
        'created . modified';

      .database-name {
        grid-area: name;
      }

      .database-created-on {
        grid-area: created;
      }

      .database-modified-on {
        grid-area: modified;
      }
    }

    .database-box-options {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
