export const Prefix = {
  CONNECTION_STATE: "CONNECTION_STATE"
};

export const Types = {
  CONNECTION_STATE_UPDATE: "CONNECTION_STATE_UPDATE"
};

export default function connection(state = true, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.CONNECTION_STATE_UPDATE:
      return payload;

    default:
      return state;
  }
}
