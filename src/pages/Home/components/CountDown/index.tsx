import { CountDownContainer, Separator } from "./styles";
import { useContext, useEffect } from 'react'
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function CountDown() {
  const { activeCycle, activeCycleId, setCurrentCycleToFinished, passedSecondsAmount, setPassedSeconds } = useContext(CyclesContext)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if(activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if(secondsDifference >= totalSeconds) {
          setCurrentCycleToFinished()
          setPassedSeconds(totalSeconds)
          clearInterval(interval)
        } else {
          setPassedSeconds(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }

  }, [activeCycle, totalSeconds, activeCycleId, setCurrentCycleToFinished, setPassedSeconds])

  const currentSeconds = activeCycle ? totalSeconds - passedSecondsAmount : 0

  const currentPassedMinutes = Math.floor(currentSeconds / 60)
  const currentPassedSeconds = currentSeconds % 60

  const minutes = String(currentPassedMinutes).padStart(2, '0')
  const seconds = String(currentPassedSeconds).padStart(2, '0')

  useEffect(() => {

    if(activeCycle) {
      document.title = `${minutes}:${seconds}`
    }

  }, [minutes, seconds, activeCycle])

  return(
  <CountDownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <Separator>:</Separator>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </CountDownContainer>

  )
}