import React from 'react';
import { shallow } from 'enzyme';
import { NoteView } from '.';


const setup = function ({
  id = '1',
  title = 'Test note',
  content = 'Content...',
  isInTrash = false,
  isEditing = false,
  isSelected = false,
  isPinned = false,
} = {}) {
  const props = {
    id,
    title,
    content,
    isInTrash,
    isEditing,
    isSelected,
    isPinned,
    onEditRef: jest.fn(),
    onContentInputRef: jest.fn(),
    onSave: jest.fn(),
    onContentInputChange: jest.fn(),
    onAreaClick: jest.fn(),
  };

  const wrapper = shallow(
    <NoteView {...props} />
  );

  return { props, wrapper };
};


describe('NoteView', () => {
  it('renders title', () => {
    const title = 'Test title';
    const { wrapper } = setup({ title });

    expect(
      wrapper
      .find('.note .titleWrapper')
      .text()
    ).toEqual(title);
  });

  it('renders content', () => {
    const content = 'Test content';
    const { wrapper } = setup({ content });

    expect(
      wrapper
      .find('.note .content p')
      .text()
    ).toEqual(content);
  });

  it('wrapper div has class `isEditing` if corresponding is true', () => {
    const { wrapper } = setup({ isEditing: true });

    expect(
      wrapper
      .find('.wrapper')
      .first()
      .hasClass('isEditing')
    ).toBe(true);
  });


  it('note div has class `isSelected` if corresponding is true', () => {
    const { wrapper } = setup({ isSelected: true });

    expect(
      wrapper
      .find('.note')
      .first()
      .hasClass('isSelected')
    ).toBe(true);
  });

  it('note div has class `isPinned` if corresponding is true', () => {
    const { wrapper } = setup({ isPinned: true });

    expect(
      wrapper
      .find('.note')
      .first()
      .hasClass('isPinned')
    ).toBe(true);
  });

  it('calls `onAreaClick` on wrapper click', () => {
    const { props: { onAreaClick }, wrapper } = setup();

    wrapper.find('.wrapper').simulate('click');
    expect(onAreaClick.mock.calls.length).toBe(1);
  });

  it('renders edit form if `isEditing` is true', () => {
    const { wrapper } = setup({ isEditing: true });

    expect(
      wrapper
      .childAt(0)
      .is('OuterClick')
    ).toBe(true);
  });
});
