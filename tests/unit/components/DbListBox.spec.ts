import { shallowMount } from '@vue/test-utils';
import DbListBox from '@/vue/components/DbListBox.vue';

const vm = shallowMount(DbListBox, {
  propsData: {
    fileName: 'test.db',
    createdOn: new Date('1991-09-24').toString(),
    lastModifiedOn: new Date('1991-09-24').toString()
  }
});

describe('DbListBox component', () => {
  test('dates format correctly', () => {
    expect(vm.find('.database-created-on').attributes().title).toEqual(
      '01:00:00 1991-09-24'
    );
    expect(vm.find('.database-created-on').text()).toMatch(
      '01:00:00 Tue 24th September 1991'
    );

    expect(vm.find('.database-modified-on').attributes().title).toEqual(
      '01:00:00 1991-09-24'
    );
    expect(vm.find('.database-modified-on').text()).toMatch(
      '01:00:00 Tue 24th September 1991'
    );
  });
});
