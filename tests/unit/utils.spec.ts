import fs from 'fs';
import path from 'path';
import utils from '@/common/utils';

describe('utils', () => {
  test('database methods', async () => {
    const lastDirPath = utils.databases.dirPath;

    await Promise.resolve(
      (utils.databases.dirPath = path.resolve(__dirname, 'databases'))
    )
      .then(async () => {
        // 'init' method tests
        await fs.promises
          .access(utils.databases.dirPath, fs.constants.F_OK)
          .catch((e) => {
            expect(e.code).toBe('ENOENT');
          });

        await utils.databases.init();

        expect(await fs.promises.readdir(utils.databases.dirPath)).toEqual([]);
      })
      .then(async () => {
        // 'createNewDatabase' method tests
        await utils.databases.createNewDatabase('foo');

        expect(await fs.promises.readdir(utils.databases.dirPath)).toEqual([
          'foo.db'
        ]);
      })
      .then(async () => {
        // 'fetchSingleDb' method tests
        expect(await utils.databases.fetchSingleDb('nonexistent')).toBe(null);

        const db = await utils.databases.fetchSingleDb('foo');
        expect(db).toBeDefined();
        expect(db!.fileName).toBe('foo.db');
      })
      .then(async () => {
        // 'fetchAllDbFiles' method tests
        const dbs = await utils.databases.fetchAllDbFiles();

        expect(dbs[0].fileName).toEqual('foo.db');
      })
      .then(async () => {
        // 'deleteDatabase' method tests
        await utils.databases.deleteDatabase('foo');

        expect(await fs.promises.readdir(utils.databases.dirPath)).toEqual([]);
      })
      .then(async () => {
        // cleanup
        await fs.promises.rmdir(utils.databases.dirPath, { recursive: true });

        utils.databases.dirPath = lastDirPath;
      });
  });
});
