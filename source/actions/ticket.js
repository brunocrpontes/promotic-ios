import { Types } from "../reducers/tickets";

/**
 * @param {string} id - User ID to mix with cupom code
 * @param {string} code - Cupom code
 */
export function useTicket(id, code) {
  return {
    type: Types.USE_TICKET_REQUEST,
    payload: { id, code }
  };
}

export function useTicketSuccess() {
  return {
    type: Types.USE_TICKET_SUCCESS
  };
}

export function requestTicketList() {
  return {
    type: Types.LIST_TICKETS_REQUEST
  };
}

export function requestTicketListSuccess(tickets) {
  return {
    type: Types.LIST_TICKETS_SUCCESS,
    payload: tickets
  };
}
