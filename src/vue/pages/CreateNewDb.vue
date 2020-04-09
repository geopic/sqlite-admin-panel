<template>
  <div id="create-new-db">
    <h2>Create new database</h2>
    <form @submit.prevent="createDatabase">
      <div class="form-section">
        <label for="db-name">Database name:</label>
        <input
          type="text"
          name="db-name"
          id="db-name"
          value="data"
          title="Only alphanumeric characters (and no spaces)."
          pattern="^[a-zA-Z0-9]+$"
          @input="handleDbNameInput"
        />
      </div>
      <div class="form-section db-exists-warning-box" v-if="badDbName">
        Database '{{ badDbName }}' already exists.
        <strong
          >Are you sure you wish to overwrite it and create a new
          database?</strong
        >
      </div>
      <div class="form-section">
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';

@Component
export default class CreateNewDb extends Vue {
  badDbName: string | null = null;
  existingDbs: string[] = [];

  created() {
    // Load all names of databases to ensure there will be no naming conflict
    // when a new database is created.
    fetch(`${props.site.serverHost}/database`)
      .then((res) => res.json())
      .then((files) => {
        this.existingDbs = files;
      })
      .catch((err) => console.error(err));
  }

  /**
   * Handle changes to state from input event in db-name text field.
   */
  handleDbNameInput() {
    // Invalid db name would have been changed, so update view to remove warning
    this.badDbName = null;
  }

  /**
   * Handle the creation of the database from the form submit event.
   */
  createDatabase(e: Event) {
    const dbName =
      ((e.target as HTMLFormElement).querySelector(
        'input[name="db-name"]'
      ) as HTMLInputElement).value || 'data';

    if (this.existingDbs.includes(dbName) && !this.badDbName) {
      // First time user attempts to create new database with existing filename
      this.badDbName = dbName;
      return;
    }

    fetch(`${props.site.serverHost}/database/${dbName}`, {
      method: 'POST'
    })
      .then(() => {
        this.$router.push({ name: 'home' });
      })
      .catch((err) => console.error(err));
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
      text-align: center;

      label {
        margin-bottom: 10px;
      }

      input {
        padding: 8px 0px;
        text-align: center;
      }
    }

    .db-exists-warning-box {
      background-color: lightcoral;
      border: 1px solid firebrick;
      margin: 5px auto;
      max-width: 860px;
      padding: 8px;
    }
  }
}
</style>
