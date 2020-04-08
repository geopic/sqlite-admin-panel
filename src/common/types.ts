/**
 * src/common/types.ts
 * Common custom types and interfaces.
 * © George Pickering 2020, https://github.com/geopic
 */

/**
 * Database information object, with filename, creation date and last-modified date.
 */
export type DatabaseInfo = {
  uuid: string;
  fileName: string;
  createdOn: Date;
  lastModifiedOn: Date;
};

/**
 * Individual table information object, with name of table, raw SQL query to
 * create table and an array of objects which represent each row of the table.
 */
export type DatabaseInfoTable = {
  uuid: string;
  name: string;
  sql: string;
  columns: any;
  data: any;
};
