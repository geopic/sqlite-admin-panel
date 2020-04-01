import fs from 'fs';
import path from 'path';
import utils from '@/common/utils';

describe('utils', () => {
  describe('databases', () => {
    const lastDirPath = utils.databases.dirPath;
    beforeAll(
      async () =>
        (utils.databases.dirPath = path.resolve(__dirname, 'databases'))
    );
    afterAll(async () => {
      await fs.promises.rmdir(utils.databases.dirPath, { recursive: true });
      utils.databases.dirPath = lastDirPath;
    });

    test('init', async () => {
      await fs.promises
        .access(utils.databases.dirPath, fs.constants.F_OK)
        .catch((e) => {
          expect(e.code).toBe('ENOENT');
        });

      await utils.databases.init();
      expect(await fs.promises.readdir(utils.databases.dirPath)).toEqual([]);
    });

    test('fetchAllFileNames', async () => {
      expect(await utils.databases.fetchAllFileNames()).toEqual([]);

      await fs.promises.writeFile(
        path.resolve(utils.databases.dirPath, 'foo.txt'),
        'test'
      );
      expect(await utils.databases.fetchAllFileNames()).toEqual(['foo.txt']);
    });
  });
});
