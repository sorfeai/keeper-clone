import times from 'lodash/times';
import { fromJS, Map, List } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import { NotesFeedView } from '.';


const sampleNote = (id) =>
  Map({
    id,
    title: 'test title',
    content: 'test content',
  });

const propsSetup = {
  pinnedIds: List(),
  selectedIds: List(),
};

describe('NotesFeedView', () => {
  it('renders as grid if `isGrid` set to true', () => {
    const data = fromJS({
      pinned: {},
      other: {
        1: times(2, sampleNote),
        2: times(2, sampleNote),
        3: times(2, sampleNote),
      },
    });

    const wrapper = shallow(
      <NotesFeedView
        notes={data}
        isGrid
        {...propsSetup}
      />
    );

    expect(
      wrapper
      .find('.notesFeed')
      .hasClass('notesGrid')
    ).toBe(true);
  });

  it('renders as list if `isGrid` set to false or not provided', () => {
    const data = fromJS({
      pinned: {},
      other: times(6, sampleNote),
    });

    const wrapper = shallow(
      <NotesFeedView
        notes={data}
        isGrid={false}
        {...propsSetup}
      />
    );

    expect(
      wrapper
      .find('.notesFeed')
      .hasClass('notesList')
    ).toBe(true);
  });

  // it('renders ')
});
