import { createSelector } from 'reselect';


export const getApp = (state) => state.app;

export const getAppCurrentPage = createSelector(
  getApp,
  (app) => app.get('currentPage')
);

export const getAppIsMainMenuActive = createSelector(
  getApp,
  (app) => app.get('isMainMenuActive')
);

export const getAppIsFeedViewGrid = createSelector(
  getApp,
  (app) => app.get('isFeedViewGrid')
);

export const getAppIsSearchingNotes = createSelector(
  getApp,
  (app) => app.get('isSearchingNotes')
);

export const getAppRefreshStatus = createSelector(
  getApp,
  (app) => app.get('refreshStatus')
);

export const getAppMaxColumns = createSelector(
  getApp,
  (app) => app.get('maxColumns')
);

export const getAppUser = createSelector(
  getApp,
  (app) => app.get('user')
);
