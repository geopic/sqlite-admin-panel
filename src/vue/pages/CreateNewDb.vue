<template>
  <div id="create-new-db">
    <h2>Create new database</h2>
    <form @submit.prevent="createDatabase">
      <div class="form-section">
        <label for="db-name">Filename:</label>
        <input
          type="text"
          name="db-name"
          id="db-name"
          value="data.db"
          @focus="handleDbNameFocus"
        />
      </div>
      <div class="form-section">
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '../../common/props';

@Component
export default class CreateNewDb extends Vue {
  existingDbs: string[] = [];

  created() {
    // Load all names of databases to ensure there will be no naming conflict
    // when a new database is created.
    // TODO: make form check existingDbs array
    fetch(`${props.site.serverHost}/db`)
      .then((res) => res.json())
      .then((filenames) => (this.existingDbs = filenames))
      .catch((err) => console.error(err));
  }

  /**
   * Ensure the filename (and not the extension) is selected at first when the
   * user focuses on the 'database name' text field.
   */
  handleDbNameFocus(e: MouseEvent) {
    const targ = e.target as HTMLInputElement;

    targ.setSelectionRange(0, targ.value.indexOf('.'));
  }

  /**
   * Handle the creation of the database from the form submit event.
   */
  createDatabase(e: Event) {
    fetch(
      `${props.site.serverHost}/db/${
        ((e.target as HTMLFormElement).querySelector(
          'input[name="db-name"]'
        ) as HTMLInputElement).value
      }`,
      {
        method: 'POST'
      }
    ).catch((err) => console.error(err));
  }
}
</script>

<style lang="scss" scoped>
#create-new-db {
  form {
    font-size: 115%;
    padding: 5px;

    .form-section {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 10px 0px;

      label {
        margin-bottom: 10px;
      }

      input {
        padding: 8px 0px;
        text-align: center;
      }
    }
  }
}
</style>
