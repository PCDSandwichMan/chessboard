import { createStore } from "redux";
import { rootReducer } from "../redux/store";

// - Abstracting logic for custom selector
export const findByTestAttr = (component, attr) => {
  console.log(attr);
  return component.find(`[data-test='${attr}']`);
};

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState);
};
