/**
 * src/common/types.ts
 * Common custom types and interfaces.
 * © George Pickering 2020, https://github.com/geopic
 */

/**
 * Database information type, with filename, creation date and last-modified date.
 */
export type DatabaseInfo = {
  uuid: string;
  fileName: string;
  createdOn: Date;
  lastModifiedOn: Date;
};

/**
 * Individual table information type, with name of table, raw SQL query to
 * create table and an array of objects which represent each row of the table.
 */
export type DatabaseInfoTable = {
  uuid: string;
  name: string;
  sql: string;
  columns: object[];
  data: DatabaseInfoTableRow[];
};

/**
 * Individual table row information type.
 */
export type DatabaseInfoTableRow = {
  uuid: string;
  fields: {
    uuid: string;
    content: string | null;
  }[];
};

/**
 * Type used for creating new columns or modifiying existing columns, modelled
 * after a CREATE TABLE or ALTER TABLE statement.
 */
export type TableColumnSpecs = {
  name: string;
  dataType: 'INTEGER' | 'TEXT' | 'BLOB' | 'REAL' | 'NUMERIC';
  notNull: boolean;
  primaryKey: boolean;
  foreignKey: null; // TODO: address this
};
