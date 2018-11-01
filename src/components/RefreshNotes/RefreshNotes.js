import React from 'react';
import { connect } from 'react-redux';

import { getAppRefreshStatus } from '../../selectors';
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


const mapStateToProps = (state) => ({
  refreshStatus: getAppRefreshStatus(state),
});

const mapDispatchToProps = { startRefresh };

RefreshNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefreshNotes);


export { RefreshNotes };
