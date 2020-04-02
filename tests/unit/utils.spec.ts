import fs from 'fs';
import path from 'path';
import utils from '@/common/utils';

describe('utils', () => {
  test('database methods', async () => {
    // init test environment
    const lastDirPath = utils.databases.dirPath;

    await Promise.resolve(
      (utils.databases.dirPath = path.resolve(__dirname, 'databases'))
    );

    // 'init' tests
    await fs.promises
      .access(utils.databases.dirPath, fs.constants.F_OK)
      .catch((e) => {
        expect(e.code).toBe('ENOENT');
      });

    await utils.databases.init();

    expect(await fs.promises.readdir(utils.databases.dirPath)).toEqual([]);

    // 'createNewDatabase' tests
    await utils.databases.createNewDatabase('foo');

    expect(await fs.promises.readdir(utils.databases.dirPath)).toEqual([
      'foo.db'
    ]);

    // 'fetchAllFileNames' tests
    await fs.promises.writeFile(
      path.resolve(utils.databases.dirPath, 'foo.txt'),
      'test'
    );

    expect(await utils.databases.fetchAllFileNames()).toEqual([
      'foo.db',
      'foo.txt'
    ]);

    // cleanup
    await fs.promises.rmdir(utils.databases.dirPath, { recursive: true });

    utils.databases.dirPath = lastDirPath;
  });
});
