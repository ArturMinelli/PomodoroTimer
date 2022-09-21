import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { createNewCycleAction, interruptCurrentCycleAction, setCurrentCycleToFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

export interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  passedSecondsAmount: number;
  setCurrentCycleToFinished: () => void;
  setPassedSeconds: (seconds: number) => void;
  createNewCycle: (data: NewCycleFormData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
    if(storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
  })

  const {cycles, activeCycleId} = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [passedSecondsAmount, setPassedSecondsAmount] = useState<number>(() => {
    if(activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function setPassedSeconds(seconds: number) {
    setPassedSecondsAmount(seconds)
  }

  function setCurrentCycleToFinished() {
    dispatch(setCurrentCycleToFinishedAction())
  }

  function createNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))
    setPassedSecondsAmount(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])


  return(
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        passedSecondsAmount,
        setCurrentCycleToFinished: setCurrentCycleToFinished,
        setPassedSeconds: setPassedSeconds,
        createNewCycle: createNewCycle,
        interruptCurrentCycle: interruptCurrentCycle,
      }}
  >
    {children}
  </CyclesContext.Provider>
  )
}