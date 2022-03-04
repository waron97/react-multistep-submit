import { ReactNode } from "react";

export interface MultistepLoaderParams {
  steps: (Step | StepGroup)[];

  render?: (steps: ProcessingStep[]) => ReactNode;
  renderStep?: (step: ProcessingStep) => ReactNode;
  renderTitle?: (stepTitle: string, globalState: ProcessPhase) => ReactNode;
  renderIcon?: (stepStatus: ProcessPhase) => ReactNode;

  activeIcon?: Node;
  waitingIcon?: Node;
  errorIcon?: Node;
  doneIcon?: Node;

  /** Function called when any step throws. */
  onError?: (error: any) => void;
}

export interface MultistepLoaderReturn {
  start: () => void;
  // abort: () => void;
  stepProgress: (ProcessingStep | ProcessingStepGroup)[];
  globalStatus: ProcessPhase;
}

export interface MultistepLoaderState {
  progress: ProcessingStep[];
  globalStatus: ProcessPhase;
}

export interface MultistepLoaderDispatch {
  START: () => void;
  STEP_INIT: (step: Step) => void;
  STEP_DONE: (step: Step, result: any) => void;
  STEP_ERR: (step: Step, error: any) => void;
  DONE: () => void;
}

export type StepGroup = Step[];

export interface ProcessingStep {
  /** The key that was defined for this step */
  key?: string;
  /** Index of the step in the original array. If the item
   * was in a step group, then this represents the index INSIDE of the group.
   */
  index: number;
  /** Current execution state of the step */
  status: ProcessPhase;
  /** The result returned by the callback associated to this step. */
  result?: Result;
}

export type ProcessingStepGroup = ProcessingStep[];

export enum ProcessPhase {
  /** If relative to a step, the step is currently being executed. If global or relative to a group, it indicates
   * active processing of the steps inside the definition.
   */
  Active = "active",
  /** If relative to a step, the step has failed to execute. If global or relative to a group, it indicates
   * failure of one of the steps inside the definition.
   */
  Error = "error",
  /** The step or step group is currently waiting for previous items to finish executing */
  Waiting = "waiting",
  /** The step or step group has executed succesffully. */
  Done = "done",
}

type Node = ReactNode | (() => ReactNode);

/** If step contains a single execution, then only one result is returned.
 * If step containst parallel operations, an array is populated with the results
 */
export type Result = any | any[];

export interface Step {
  /** Title to be displayed for this step. */
  title: string | ((phase: ProcessPhase) => string);
  /** A unique identifier for this step. */
  key?: string;
  /** The function that will be executed when this step is reached.
   * The return value of the previous step is included. */
  callback: (previous?: Result) => Promise<void>;
  /** Function to be called when an error is thrown from this step. */
  onError?: (error: any) => Promise<void>;
  /** If a step after the current one throws an error, the rollback function is called on all
   * previous steps. You have access the the step's result. */
  rollback?: (result?: any) => Promise<void>;
  /** Define the order in which rollback functions are called. By default, the order
   * is the reverse of the original step definition, i.e. the last step to execute will have its
   * rollback function called first.
   */
  rollbackIndex?: number;
}
