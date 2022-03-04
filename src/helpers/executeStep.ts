import { Result, Step, StepGroup } from "../types";
import { StepGroupItemRejectionError, StepRejectionError } from "./errors";

export async function executeStep(
  step: Step | StepGroup,
  index: number,
  prevValue: Result
) {
  if (Array.isArray(step)) {
    return handleStepGroupExecution(step, index, prevValue);
  }
  return await handleStepExecution(step, index, prevValue);
}

async function handleStepExecution(
  step: Step,
  index: number,
  prevValue: Result
) {
  const { callback } = step;
  return await callback(prevValue).catch((e) => {
    throw new StepRejectionError({ index, value: e });
  });
}

async function handleStepGroupExecution(
  group: StepGroup,
  index: number,
  prevValue: Result
) {
  const promises = group.map((step, groupItemIndex) =>
    handleStepExecution(step, index, prevValue).catch((e) => {
      throw new StepGroupItemRejectionError({
        index,
        value: e,
        groupItemIndex,
      });
    })
  );
  return await Promise.all(promises);
}
