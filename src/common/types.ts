/**
 * src/common/types.ts
 * Common custom types and interfaces.
 * © George Pickering 2020, https://github.com/geopic
 */

/**
 * Database information object, with filename, creation date and last-modified date.
 */
export type DatabaseInfo = {
  id: string;
  fileName: string;
  createdOn: Date;
  lastModifiedOn: Date;
};
