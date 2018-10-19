import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Level, Heading } from 'react-bulma-components/full';

import { IconButton } from '..';
import style from '../Header/Header.module.scss';


const SelectBarView = ({
  selectedNotesCount,
  isTrash,
  onPin,
  onMoveToTrash,
  onDeleteForever,
  onClearSelection,
}) => {
  const toolbar = (
    <Level className={style.btnGroup}>
      <Level.Item className={style.btnGroupItem}>
        <IconButton
          onClick={onPin}
          tooltip="Pin selected"
          icon="thumbtack"
        />
      </Level.Item>
      <Level.Item className={style.btnGroupItem}>
        <IconButton
          onClick={onMoveToTrash}
          tooltip="Move to trash"
          icon="trash"
        />
      </Level.Item>
    </Level>
  );

  const toolbarTrash = (
    <Level className={style.btnGroup}>
      <Level.Item className={style.btnGroupItem}>
        <IconButton
          onClick={onDeleteForever}
          tooltip="Delete forever"
          icon="ban"
        />
      </Level.Item>
    </Level>
  );

  const rightSide = isTrash ? toolbarTrash : toolbar;

  return (
    <div className={style.selectBar}>
      <Level className={style.container}>
        <Level.Side align="left">
          <Level.Item className={style.clearSelectionBtn}>
            <IconButton
              onClick={onClearSelection}
              tooltip="Cancel selection"
              icon="arrow-left"
            />
          </Level.Item>
          <Level.Item>
            <Heading subtitle size={5}>
              <FormattedMessage
                id="selectedNotesCount"
                defaultMessage={`You selected
                  {selectedNotesCount, number}
                  {selectedNotesCount, plural, one {note} other {notes}}`}
                values={{ selectedNotesCount }}
              />
            </Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            {rightSide}
          </Level.Item>
        </Level.Side>
      </Level>
    </div>
  );
};


SelectBarView.propTypes = {
  selectedNotesCount: PropTypes.number.isRequired,
  isTrash: PropTypes.bool.isRequired,
  onPin: PropTypes.func.isRequired,
  onMoveToTrash: PropTypes.func.isRequired,
  onDeleteForever: PropTypes.func.isRequired,
  onClearSelection: PropTypes.func.isRequired,
};


export { SelectBarView };
