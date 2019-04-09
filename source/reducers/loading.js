import _ from "lodash";

export function createLoadingSelector(actions) {
  return function(state) {
    return _(actions).some(action => _.get(state, `loading.${action}`, false));
  };
}

export default function loading(state = {}, action) {
  const { type, payload } = action;

  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  console.log(requestName + "_" + requestState);

  return {
    ...state,

    [requestName]: requestState === "REQUEST"
  };
}
