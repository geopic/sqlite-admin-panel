/**
 * src/common/props.ts
 * Common strings, objects and other properties.
 * © George Pickering 2020, https://github.com/geopic
 */

export default {
  site: {
    name: 'sqlite-admin-panel',
    serverPort: 3010,
    get serverHost() {
      return process.env.NODE_ENV === 'development'
        ? `http://localhost:${this.serverPort}`
        : '';
    },
    // localStorage key.
    get lsKey() {
      return this.name;
    }
  }
};
