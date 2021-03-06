/**
 * src/common/utils.ts
 * Common functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import fs from 'fs';
import path from 'path';
import props from '@/common/props';
import sqlite3 from 'better-sqlite3';
import {
  DatabaseInfo,
  DatabaseInfoTable,
  DatabaseInfoTableRow
} from '@/common/types';
import { v4 as uuidv4 } from 'uuid';

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
      const newDbPath = path.resolve(this.dirPath, fileName);

      // Delete any existing db with the same name
      if ((await fs.promises.readdir(this.dirPath)).includes(fileName)) {
        await fs.promises.unlink(newDbPath);
      }

      sqlite3(newDbPath);
    },

    /**
     * Fetch single database file from directory.
     * @param fileName Name of file (database) to fetch info on.
     */
    async fetchSingleDb(fileName: string): Promise<DatabaseInfoTable[] | null> {
      await this.init();

      const dbFilePath = path.resolve(this.dirPath, fileName);

      try {
        await fs.promises.access(dbFilePath, fs.constants.F_OK);
      } catch {
        console.error(`Database '${fileName}' requested but cannot be found.`);
        return null;
      }

      const dbData: DatabaseInfoTable[] = new sqlite3(dbFilePath)
        .prepare(`SELECT name, sql FROM sqlite_master WHERE type = 'table'`)
        .all();

      for (const entry of dbData) {
        const stmt = new sqlite3(dbFilePath)
          .prepare(`SELECT * FROM ${entry.name}`)
          .raw(true);

        entry.uuid = uuidv4();
        entry.data = stmt.all().map((fields) => {
          const content = [];

          for (const field of fields) {
            content.push({ uuid: uuidv4(), content: field });
          }

          return {
            uuid: uuidv4(),
            fields: content
          };
        });
        entry.columns = (stmt.columns() as any[]).map((obj) => {
          obj.uuid = uuidv4();
          return obj;
        });
      }

      return dbData;
    },

    /**
     * Fetch all database files from directory.
     */
    async fetchAllDbFiles(): Promise<DatabaseInfo[]> {
      await this.init();

      const arr = [];
      for await (const file of await fs.promises.readdir(this.dirPath)) {
        const info: DatabaseInfo = {
          uuid: uuidv4(),
          fileName: file,
          createdOn: (await fs.promises.stat(path.resolve(this.dirPath, file)))
            .ctime,
          lastModifiedOn: (
            await fs.promises.stat(path.resolve(this.dirPath, file))
          ).mtime
        };
        arr.push(info);
      }
      return arr;
    },

    /**
     * Delete a database file from directory.
     * @param fileName Name of file (database) to delete.
     */
    async deleteDatabase(fileName: string): Promise<void> {
      await fs.promises.unlink(path.resolve(this.dirPath, `${fileName}`));
    }
  }
};
