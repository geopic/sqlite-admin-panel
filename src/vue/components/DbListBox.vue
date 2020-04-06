<template>
  <div class="database-list-box">
    <div class="database-list-box-name-stats">
      <div class="database-name">{{ fileName }}</div>
      <div class="database-stats">
        <div class="database-created-on" :title="formatDateAlt(createdOn)">
          Created on {{ formatDate(createdOn) }}
        </div>
        <div
          class="database-modified-on"
          :title="formatDateAlt(lastModifiedOn)"
        >
          Last modified on {{ formatDate(lastModifiedOn) }}
        </div>
      </div>
    </div>

    <div class="database-list-box-options" @click="handleOptions">
      <button type="button" class="option-view">View</button>
      <button type="button" class="option-delete">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import props from '@/common/props';
import { format } from 'date-fns';

@Component
export default class DbListBox extends Vue {
  @Prop() fileName!: string;
  @Prop() createdOn!: string;
  @Prop() lastModifiedOn!: string;

  /**
   * Format date string into human-readable format.
   */
  formatDate(date: string): string {
    return format(new Date(date), 'HH:mm:ss EEE do LLLL y');
  }

  /**
   * Standard Year-month-day display, made visible on hover via title attribute.
   */
  formatDateAlt(date: string): string {
    return format(new Date(date), 'HH:mm:ss y-LL-dd');
  }

  /**
   * Handle database option buttons (view, delete).
   */
  handleOptions(e: MouseEvent) {
    const targ = e.target as HTMLElement;

    if (/view/i.test(targ.className)) {
      this.$router.push(`/view-db/${this.fileName.split('.')[0]}`);
    }

    if (/delete/i.test(targ.className)) {
      if (
        confirm(
          `Are you sure you wish to delete this database (${this.fileName})?`
        )
      ) {
        fetch(
          `${props.site.serverHost}/database/${this.fileName.split('.')[0]}`,
          {
            method: 'DELETE'
          }
        )
          .then(() => this.$el.remove())
          .catch((err) => console.error(err));
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.database-list-box {
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

  .database-list-box-name-stats {
    line-height: 1.2rem;
    text-align: center;

    .database-name {
      font-size: 120%;
      font-weight: bold;
    }

    .database-stats {
      font-size: 90%;
    }

    @media all and (min-width: $medquery-min-width-02) {
      line-height: 1.6rem;
    }

    @media all and (min-width: $medquery-min-width-03) {
      line-height: 1.8rem;
    }
  }

  .database-list-box-options {
    & > * {
      border: 1px solid transparent;
      cursor: pointer;
      display: block;
      margin: 3px auto;
      padding: 10px;
      width: 80px;
    }

    .option-view {
      background-color: lightblue;
      border-color: skyblue;

      &:active,
      &:hover {
        background-color: #4aa1c0;
        border-color: #1e5368;
        color: white;
      }
    }

    .option-delete {
      background-color: lightpink;
      border-color: #ff9999;

      &:active,
      &:hover {
        background-color: lightcoral;
        border-color: firebrick;
        color: white;
      }
    }

    @media all and (min-width: $medquery-min-width-01) {
      & > * {
        width: 100px;
      }
    }

    @media all and (min-width: $medquery-min-width-02) {
      & > * {
        width: 200px;
      }
    }

    @media all and (min-width: $medquery-min-width-03) {
      & > * {
        display: inline-block;
        margin: 3px;
      }
    }
  }

  @media all and (min-width: $medquery-min-width-04) {
    border: 1px solid transparent;
    margin: 0px auto;
    width: $medquery-min-width-04;

    &:hover {
      border-color: #929292;
    }
  }
}
</style>
