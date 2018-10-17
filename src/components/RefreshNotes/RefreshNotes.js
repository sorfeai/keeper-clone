import React from 'react';
import { connect } from 'react-redux';
import { startRefresh } from '../../actions';
import { IconButton, SpinnerLoading } from '..';
import { REFRESH_IN_PROGRESS, REFRESH_DONE } from '../../constants/types';


let RefreshNotes = ({ refreshStatus, startRefresh }) => {
  switch (refreshStatus) {
    case REFRESH_IN_PROGRESS:
      return <SpinnerLoading />;
    case REFRESH_DONE:
      return <IconButton icon="check" />;
    default:
      return (
        <IconButton
          onClick={startRefresh}
          icon="sync-alt"
          tooltip="Refresh"
        />
      );
  }
};


/**
* connect to state
*/

const mapStateToProps = (state) => ({
  refreshStatus: state.common.refreshStatus,
});

const mapDispatchToProps = { startRefresh };

RefreshNotes = connect(mapStateToProps, mapDispatchToProps)(RefreshNotes);


export { RefreshNotes };
