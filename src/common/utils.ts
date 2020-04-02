/**
 * src/common/utils.ts
 * Common functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import fs from 'fs';
import path from 'path';
import props from '@/common/props';
import sqlite3 from 'better-sqlite3';

export default {
  /**
   * Gets data from localStorage.
   * @returns The data from localStorage.
   */
  loadDataFromLS(): object | null {
    return localStorage.getItem(props.site.lsKey)
      ? JSON.parse(localStorage.getItem(props.site.lsKey) as string)
      : null;
  },

  /**
   * Saves data to localStorage.
   * @param data The data to save to localStorage.
   */
  saveDataToLS(data: object) {
    localStorage.setItem(props.site.lsKey, JSON.stringify(data));
  },

  /**
   * Clears all data (related to site) from localStorage.
   */
  clearDataFromLS() {
    localStorage.removeItem(props.site.lsKey);
  },

  databases: {
    dirPath: path.resolve(__dirname, '..', '..', 'databases'),

    /**
     * Check if directory exists, create it if not.
     */
    async init(): Promise<void> {
      await fs.promises
        .access(this.dirPath, fs.constants.F_OK)
        .catch(async () => await fs.promises.mkdir(this.dirPath));
    },

    /**
     * Create new database file in dirPath.
     * @param fileName File to create in dirPath.
     */
    async createNewDatabase(fileName: string): Promise<void> {
      await this.init();
      sqlite3(path.resolve(this.dirPath, `${fileName}.db`));
    },

    /**
     * Fetch all database names (filenames) from directory.
     */
    async fetchAllFileNames(): Promise<string[]> {
      await this.init();
      return await fs.promises.readdir(this.dirPath);
    }
  }
};
