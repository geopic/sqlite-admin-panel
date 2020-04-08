<template>
  <div id="view-db">
    <h2 id="db-name">
      {{ this.$route.params.dbName }} ({{ dbData.length }} table{{
        dbData.length !== 1 ? 's' : ''
      }})
    </h2>
    <template v-if="dbData.length > 0">
      <div
        class="db-table-box"
        v-for="tableData of dbData"
        :key="tableData.uuid"
      >
        <div class="db-table-name">Name: {{ tableData.name }}</div>
        <div class="db-table-sql">SQL: {{ tableData.sql }}</div>
        <table class="db-table-data-box">
          <thead>
            <tr>
              <th
                class="db-table-data-column-name"
                v-for="column of tableData.columns"
                :key="column.uuid"
              >
                {{ column.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="db-table-data-row"
              v-for="row of tableData.data"
              :key="row.uuid"
            >
              <td v-for="field of row.field" :key="field.uuid">
                {{ field.fieldContent }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else>
      <div id="db-no-tables-display">
        There are no tables in the database.
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';

@Component
export default class ViewDb extends Vue {
  dbData = [];

  created() {
    if (!this.$route.params.dbName) {
      this.$router.replace({ name: 'home' });
      return;
    }
    fetch(`${props.site.serverHost}/database/${this.$route.params.dbName}`)
      .then((res) => res.json())
      .then((dbData) => {
        this.dbData = dbData;
      })
      .catch((err) => console.error(err));
  }
}
</script>

<style lang="scss" scoped>
#view-db {
  .db-table-box {
    padding: 10px;
  }
}
</style>
