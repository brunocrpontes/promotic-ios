export function remove(prefix) {
  return {
    type: `${prefix}_REMOVE_ERROR`
  };
}

export function add(prefix, message) {
  return {
    type: `${prefix}_FAILURE`,
    payload: message
  };
}
