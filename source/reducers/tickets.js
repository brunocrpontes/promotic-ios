export const Prefix = {
  USE_TICKET: "USE_TICKET",
  LIST_TICKETS: "LIST_TICKETS"
};

export const Types = {
  //USE TICKET
  USE_TICKET_REQUEST: `${Prefix.USE_TICKET}_REQUEST`,
  USE_TICKET_SUCCESS: `${Prefix.USE_TICKET}_SUCCESS`,
  USE_TICKET_FAILURE: `${Prefix.USE_TICKET}_FAILURE`,

  //REQUEST LIST OF TICKETS
  LIST_TICKETS_REQUEST: `${Prefix.LIST_TICKETS}_REQUEST`,
  LIST_TICKETS_SUCCESS: `${Prefix.LIST_TICKETS}_SUCCESS`,
  LIST_TICKETS_FAILURE: `${Prefix.LIST_TICKETS}_FAILURE`
};

export default function tickets(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case Types.LIST_TICKETS_SUCCESS:
      return [...payload];

    default:
      return state;
  }
}
