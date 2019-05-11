export const Prefix = {
  subscribe: '@@notification/SUBSCRIBE',
  revoke: '@@notification/REVOKE'
}

export const Types = {
  NOTIFICATION_SUBSCRIBE_REQUEST: `${Prefix.subscribe}_REQUEST`,
  NOTIFICATION_SUBSCRIBE_SUCCESS: `${Prefix.subscribe}_SUCCESS`,
  NOTIFICATION_SUBCRIBE_FAILURE: `${Prefix.subscribe}_FAILURE`,

  NOTIFICATION_REVOKE_REQUEST: `${Prefix.revoke}_REQUEST`,
  NOTIFICATION_REVOKE_SUCCESS: `${Prefix.revoke}_SUCCESS`,
  NOTIFICATION_REVOKE_FAILURE: `${Prefix.revoke}_FAILURE`
}

