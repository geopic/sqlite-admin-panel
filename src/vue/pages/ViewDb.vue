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
        <h3 class="db-table-name">{{ tableData.name }}</h3>
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
              <td
                v-for="field of row.fields"
                :key="field.uuid"
                :class="{ 'null-field': !field.content }"
              >
                {{ field.content ? field.content : 'NULL' }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="db-table-sql-box">
          <button
            type="button"
            class="db-table-sql-btn"
            @click="toggleShowHideSql"
          >
            Click to show SQL
          </button>
          <textarea
            class="db-table-sql-textarea hidden"
            :value="tableData.sql"
          ></textarea>
        </div>
      </div>
    </template>
    <template v-else>
      <div id="db-no-tables-display">
        There are no tables in this database.
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

  /**
   * Show / hide SQL textarea, triggered by click event on button.
   */
  toggleShowHideSql(e: MouseEvent) {
    const targ = e.target as HTMLElement;
    const txtArea = (targ.parentElement as HTMLElement).querySelector(
      'textarea'
    ) as HTMLTextAreaElement;

    if (/show/i.test(targ.textContent as string)) {
      txtArea.classList.remove('hidden');
      targ.textContent = 'Click to hide SQL';
    } else if (/hide/i.test(targ.textContent as string)) {
      txtArea.classList.add('hidden');
      targ.textContent = 'Click to show SQL';
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden {
  visibility: hidden;
}

.null-field {
  background-color: rgba(0, 0, 0, 0.3);
}

#view-db {
  .db-table-box {
    align-items: center;
    border: 2px solid #c0c0c0;
    display: flex;
    flex-direction: column;
    margin: 10px;

    .db-table-data-box {
      border-spacing: 10px 5px;
      font-size: 110%;

      .db-table-data-row {
        td {
          padding: 5px 10px;
          text-align: center;
        }
      }
    }

    .db-table-sql-box {
      text-align: center;

      textarea {
        font-family: 'Courier New', Courier, monospace;
        height: 60px;
        width: 90%;
      }
    }
  }

  #db-no-tables-display {
    font-size: 120%;
    margin: 10px 0px;
    text-align: center;
  }
}
</style>
