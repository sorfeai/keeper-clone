import { createSelector } from 'reselect';


export const getNotifications = (state) => state.notifications;

export const getNotificationsById = createSelector(
  getNotifications,
  (notfs) => notfs.get('byId')
);

export const getNotificationById = (id) => createSelector(
  getNotificationsById,
  (byId) => byId.get(id)
);

export const getNotificationsAllIds = createSelector(
  getNotifications,
  (notfs) => notfs.get('allIds')
);
