import { MultistepLoaderParams, MultistepLoaderReturn } from "../types";
import useComponentState from "./useComponentState";

export default function useMultistepLoader(
  params: MultistepLoaderParams
): MultistepLoaderReturn {
  const [state, actions] = useComponentState();

  function start() {}

  return {
    globalStatus: state.globalStatus,
    stepProgress: state.progress,
    start,
  };
}
