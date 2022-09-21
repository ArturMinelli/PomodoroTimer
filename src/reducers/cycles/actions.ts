import { Cycle } from "./reducer";

export enum ActionTypes {
  CREATE_NEW_CYCLE = "CREATE_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  SET_CURRENT_CYCLE_TO_FINISHED = "SET_CURRENT_CYCLE_TO_FINISHED"
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function setCurrentCycleToFinishedAction() {
  return {
    type: ActionTypes.SET_CURRENT_CYCLE_TO_FINISHED,
  }
}