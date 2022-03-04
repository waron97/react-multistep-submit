import { Reducer, useReducer } from "react";

import {
  MultistepLoaderDispatch,
  MultistepLoaderState,
  ProcessPhase,
} from "../types";

const reducer: ComponentReducer = (
  state: MultistepLoaderState,
  action: Action
): MultistepLoaderState => {
  return state;
};

const initialState: MultistepLoaderState = {
  globalStatus: ProcessPhase.Waiting,
  progress: [],
};

export default function useComponentState(): [
  MultistepLoaderState,
  MultistepLoaderDispatch
] {
  const [state, dispatch] = useReducer<ComponentReducer>(reducer, initialState);

  function START() {}

  function DONE() {}

  function STEP_INIT() {}

  function STEP_DONE() {}

  function STEP_ERR() {}

  return [state, { START, STEP_DONE, STEP_ERR, STEP_INIT, DONE }];
}

type ComponentReducer = Reducer<MultistepLoaderState, Action>;

interface Action {
  type: ActionType;
  payload: any;
}

type ActionType = "";
