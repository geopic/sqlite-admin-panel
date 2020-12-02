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
    <form id="db-create-table-form" @submit.prevent="createNewTable">
      <h3>Add new table</h3>
      <div id="db-table-config">
        <div id="db-table-name-box">
          <label for="db-table-name">Table name: </label>
          <input type="text" id="db-table-name" />
        </div>
        <div id="db-column-info-box">
          <span>Columns: {{ createNewTableColumns.length }}</span>
          <button
            type="button"
            @click="
              () =>
                createNewTableColumns.push(generateTableColumnDefaultValues())
            "
          >
            +
          </button>
          <button
            type="button"
            @click="
              () =>
                createNewTableColumns.length > 1
                  ? createNewTableColumns.pop()
                  : false
            "
          >
            -
          </button>
        </div>
      </div>
      <table id="db-column-spec-box-desktop">
        <thead>
          <tr>
            <th>
              <label for="column-name">Column name</label>
            </th>
            <th><label for="column-data-type">Data type</label></th>
            <th>
              <label for="column-default-value"
                >Default value <small>(leave blank if N/A)</small></label
              >
            </th>
            <th><label for="column-not-null">Not null</label></th>
            <th><label for="column-primary-key">Primary key</label></th>
            <th><label for="column-foreign-key">Foreign key</label></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="column of createNewTableColumns" :key="column.uuid">
            <td>
              <input type="text" id="column-name" :value="column.name" />
            </td>
            <td>
              <select id="column-data-type"
                ><option value="integer">INTEGER</option>
                <option value="text">TEXT</option
                ><option value="blob">BLOB</option
                ><option value="real">REAL</option
                ><option value="numeric">NUMERIC</option></select
              >
            </td>
            <td><input type="text" id="column-default-value" /></td>
            <td><input type="checkbox" id="column-not-null" /></td>
            <td><input type="checkbox" id="column-primary-key" /></td>
            <td>Foreign key cell</td>
          </tr>
        </tbody>
      </table>
      <div id="db-column-spec-box-mobile">TODO: add mobile box</div>
      <div id="db-create-table-submit-box">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { v4 as uuid } from 'uuid';
import props from '@/common/props';
import { DatabaseInfoTable, TableColumnSpecs } from '@/common/types';

@Component
export default class ViewDb extends Vue {
  dbData: DatabaseInfoTable[] = [];
  createNewTableColumns: TableColumnSpecs[] = [];

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

    this.createNewTableColumns.push(this.generateTableColumnDefaultValues());
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

  createNewTable(e: Event) {
    const targ = e.target as HTMLFormElement;
    console.log(targ);
  }

  generateTableColumnDefaultValues(): TableColumnSpecs {
    return {
      uuid: uuid(),
      name: '',
      dataType: 'INTEGER',
      notNull: false,
      primaryKey: false,
      foreignKey: null
    };
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
  padding: 5px;

  .db-table-box {
    align-items: center;
    border: 2px solid #c0c0c0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 10px auto;

    .db-table-name {
      padding: 5px;
    }

    .db-table-data-box {
      border-spacing: 10px 5px;

      .db-table-data-row {
        td {
          padding: 5px 10px;
          text-align: center;
        }
      }
    }

    .db-table-sql-box {
      text-align: center;

      button {
        cursor: pointer;
      }

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

  #db-create-table-form {
    #db-table-config {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;

      & > * {
        margin: 5px 0px;
      }

      #db-column-info-box {
        & > * {
          margin: 0px 10px;
        }

        span {
          font-weight: bold;
        }
      }
    }

    #db-column-spec-box-desktop {
      display: none;
    }

    #db-create-table-submit-box {
      text-align: center;
    }
  }

  @media all and (min-width: $medquery-min-width-03) {
    #db-create-table-form {
      #db-column-spec-box-desktop {
        display: table;
        margin: 10px auto;
        max-width: $medquery-min-width-04;
        width: 100%;

        tbody {
          td {
            text-align: center;
          }
        }
      }

      #db-column-spec-box-mobile {
        display: none;
      }
    }
  }
}
</style>
