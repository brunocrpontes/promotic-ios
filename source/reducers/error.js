import _ from "lodash";

export function createErrorSelector(actions) {
  return function(state) {
    return _(actions)
      .map(action => _.get(state, `error.${action}`))
      .concat()
      .first();
  };
}

export default function error(state = [], action) {
  const { type, payload } = action;

  const matches = /(.*)_(REQUEST|FAILURE|REMOVE_ERROR)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === "FAILURE" ? payload : null
  };
}
