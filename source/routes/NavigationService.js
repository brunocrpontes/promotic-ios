import { NavigationActions } from "react-navigation";

let navigator;

function setNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}

function pop() {
  navigator.dispatch(NavigationActions.back());
}

export default {
  pop,
  navigate,
  setNavigator
};
