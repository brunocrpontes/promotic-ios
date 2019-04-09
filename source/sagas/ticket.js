import {
  put,
  all,
  take,
  call,
  fork,
  select,
  throttle
} from "redux-saga/effects";
import { Types, Prefix } from "../reducers/tickets";
import { useTicketSuccess } from "../actions/ticket";
import { add } from "../actions/error";
import { requestTicketListSuccess } from "../actions/ticket";
import axios from "../utils/axios";
import NavigationService from "../routes/NavigationService";

export default function* rootSagaTicket() {
  yield all([tickets(), useTicket()]);
}

function* tickets() {
  while (true) {
    yield take(Types.LIST_TICKETS_REQUEST);
    yield fork(requestListTickets);
  }
}

function* requestListTickets() {
  const { id } = yield select(state => state.user);

  try {
    const { data } = yield call(axios.post, "/cliente/listarTickets", {
      id_cliente: id
    });

    yield put(requestTicketListSuccess(data));
  } catch (error) {
    yield put(add(Prefix.LIST_TICKETS, "Erro ao requisitar os tickets"));
  }
}

function* useTicket() {
  while (true) {
    const {
      payload: { id, code }
    } = yield take(Types.USE_TICKET_REQUEST);
    yield fork(requestUseTicket, { id, code });

    yield take([Types.USE_TICKET_SUCCESS, Types.USE_TICKET_FAILURE]);
  }
}

function* requestUseTicket({ id, code }) {
  try {
    const {
      data: { ok }
    } = yield call(axios.post, "/cliente/ticket", {
      id_cliente: id,
      numero: code
    });

    if (!ok) {
      yield put(add(Prefix.USE_TICKET, "Ticket Inválido"));
      return;
    }

    yield all([
      put(useTicketSuccess()),
      call(NavigationService.navigate, "NewTicketSuccess")
    ]);
  } catch (error) {
    yield put(add(Prefix.USE_TICKET, "Ticket Inválido"));
  }
}
