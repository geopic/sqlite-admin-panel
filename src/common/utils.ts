/**
 * src/common/utils.ts
 * Common functions, a.k.a. 'utils'.
 * © George Pickering 2020, https://github.com/geopic
 */

import props from '@/common/props';

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
  }
};
